import { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, DollarSign, Users, TrendingUp, Edit, Trash, Plus, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories, collections } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import ringImage from '@assets/generated_images/diamond_ring_product_shot.png';
import necklaceImage from '@assets/generated_images/gold_necklace_product_shot.png';
import earringsImage from '@assets/generated_images/pearl_earrings_product_shot.png';

// Helper to select a random image based on category if user doesn't provide one (mock behavior)
const getMockImage = (category: string) => {
  if (category === 'aneis' || category === 'pulseiras') return ringImage;
  if (category === 'colares') return necklaceImage;
  return earringsImage;
};

export default function Dashboard() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    collection: '',
    image: ''
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    if (!formData.name || !formData.price || !formData.category) {
      toast({ title: "Erro", description: "Preencha os campos obrigatórios", variant: "destructive" });
      return;
    }

    addProduct({
      name: formData.name,
      price: Number(formData.price),
      description: formData.description,
      category: formData.category,
      collection: formData.collection || 'eternal',
      image: getMockImage(formData.category), // Mock image assignment
      isNew: true
    });

    setIsAddOpen(false);
    resetForm();
    toast({ title: "Sucesso", description: "Produto adicionado com sucesso" });
  };

  const handleEdit = () => {
    if (!currentProduct) return;

    updateProduct(currentProduct.id, {
      name: formData.name,
      price: Number(formData.price),
      description: formData.description,
      category: formData.category,
      collection: formData.collection,
    });

    setIsEditOpen(false);
    setCurrentProduct(null);
    resetForm();
    toast({ title: "Sucesso", description: "Produto atualizado com sucesso" });
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(id);
      toast({ title: "Sucesso", description: "Produto removido" });
    }
  };

  const openEdit = (product: any) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      collection: product.collection,
      image: product.image
    });
    setIsEditOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      category: '',
      collection: '',
      image: ''
    });
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border pb-8">
          <div>
            <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tighter mb-2">Painel Admin</h1>
            <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
              Visão geral do sistema e inventário.
            </p>
          </div>
          
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="rounded-none bg-black text-white hover:bg-primary uppercase tracking-widest font-mono text-xs px-6 h-12 flex gap-2">
                <Plus className="h-4 w-4" /> Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background border border-border">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">Adicionar Produto</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="rounded-none" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="rounded-none" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val})}>
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="collection">Coleção</Label>
                  <Select value={formData.collection} onValueChange={(val) => setFormData({...formData, collection: val})}>
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {collections.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="desc">Descrição</Label>
                  <Input id="desc" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="rounded-none" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAdd} className="rounded-none w-full bg-black text-white hover:bg-primary uppercase tracking-widest font-mono text-xs">Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="sm:max-w-[425px] bg-background border border-border">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">Editar Produto</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nome</Label>
                  <Input id="edit-name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="rounded-none" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Preço (R$)</Label>
                  <Input id="edit-price" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="rounded-none" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Categoria</Label>
                  <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val})}>
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-collection">Coleção</Label>
                  <Select value={formData.collection} onValueChange={(val) => setFormData({...formData, collection: val})}>
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {collections.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-desc">Descrição</Label>
                  <Input id="edit-desc" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="rounded-none" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleEdit} className="rounded-none w-full bg-black text-white hover:bg-primary uppercase tracking-widest font-mono text-xs">Atualizar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { title: "Receita Total", value: "R$ 452.318,90", change: "+20.1%", icon: DollarSign },
            { title: "Vendas", value: "+2350", change: "+180.1%", icon: TrendingUp },
            { title: "Produtos", value: products.length.toString(), change: "+2 novos", icon: Package },
            { title: "Clientes", value: "+573", change: "+201h", icon: Users },
          ].map((stat, i) => (
            <div key={i} className="border border-border p-6 hover:border-black transition-colors group bg-card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{stat.title}</h3>
                <stat.icon className="h-4 w-4 text-muted-foreground group-hover:text-black transition-colors" />
              </div>
              <div className="font-display text-3xl mb-1">{stat.value}</div>
              <p className="font-mono text-[10px] text-muted-foreground">{stat.change} desde o último mês</p>
            </div>
          ))}
        </div>

        {/* Products Table Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-2xl">Inventário</h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar produtos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-none border-border bg-transparent h-10 font-mono text-xs" 
              />
            </div>
          </div>

          <div className="border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-border">
                  <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-12">Imagem</TableHead>
                  <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-12">Nome</TableHead>
                  <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-12">Categoria</TableHead>
                  <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-12">Coleção</TableHead>
                  <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-12 text-right">Preço</TableHead>
                  <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-12 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                   <TableRow>
                     <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nenhum produto encontrado.</TableCell>
                   </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-secondary/30 border-b border-border transition-colors">
                      <TableCell className="py-4">
                        <div className="h-12 w-12 bg-secondary overflow-hidden">
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all" />
                        </div>
                      </TableCell>
                      <TableCell className="font-display text-base">{product.name}</TableCell>
                      <TableCell className="font-mono text-xs uppercase tracking-widest">{product.category}</TableCell>
                      <TableCell className="font-mono text-xs uppercase tracking-widest">{product.collection}</TableCell>
                      <TableCell className="font-mono text-sm text-right">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button onClick={() => openEdit(product)} variant="ghost" size="icon" className="h-8 w-8 hover:text-black hover:bg-transparent"><Edit className="h-4 w-4" /></Button>
                          <Button onClick={() => handleDelete(product.id)} variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive hover:bg-transparent"><Trash className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
