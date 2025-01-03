import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, CheckCircle2, XCircle, Truck, Package } from 'lucide-react';

// Utility function for currency formatting
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100);
}

// OrderStatus Component
function OrderStatus({ status, aceito_pelo_vendedor, recebido_pelo_cliente }) {
  if (recebido_pelo_cliente) {
    return (
      <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
        <Package className="w-4 h-4" />
        Entregue
      </Badge>
    );
  }

  if (status === "Pendente" && !aceito_pelo_vendedor) {
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        Aguardando
      </Badge>
    );
  }

  if (aceito_pelo_vendedor) {
    return (
      <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
        <Truck className="w-4 h-4" />
        Em Transporte
      </Badge>
    );
  }

  return (
    <Badge variant="destructive" className="flex items-center gap-1">
      <XCircle className="w-4 h-4" />
      Cancelado
    </Badge>
  );
}

// OrdersTable Component
function OrdersTable({ orders, onAcceptOrder, onRejectOrder }) {
  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pedido #</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Valor Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>
                {new Date(order.data_pedido).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </TableCell>
              <TableCell className="capitalize">
                {order.tipo_pedido === 'recebido' ? 'Venda' : 'Compra'}
              </TableCell>
              <TableCell>{order.quantidade}</TableCell>
              <TableCell>{formatCurrency(order.preco_total)}</TableCell>
              <TableCell>
                <OrderStatus
                  status={order.status}
                  aceito_pelo_vendedor={order.aceito_pelo_vendedor}
                  recebido_pelo_cliente={order.recebido_pelo_cliente}
                />
              </TableCell>
              <TableCell>
                {order.status === 'Pendente' && !order.aceito_pelo_vendedor && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                      onClick={() => onAcceptOrder?.(order.id)}
                    >
                      Aceitar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                      onClick={() => onRejectOrder?.(order.id)}
                    >
                      Rejeitar
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Mock data
const mockOrders = [
  // Pedidos recebidos (vendas)
  {
    id: 1,
    customer_id: 2,
    produto_id: 1,
    quantidade: 2,
    preco_total: 150000,
    data_pedido: "2024-03-15T10:30:00.000Z",
    status: "Pendente",
    aceito_pelo_vendedor: false,
    tipo_pedido: "recebido",
    recebido_pelo_cliente: false,
    data_aceite: null,
    data_envio: null,
    data_entrega: null
  },
  {
    id: 2,
    customer_id: 3,
    produto_id: 2,
    quantidade: 1,
    preco_total: 89900,
    data_pedido: "2024-03-14T15:45:00.000Z",
    status: "Pendente",
    aceito_pelo_vendedor: true,
    tipo_pedido: "recebido",
    recebido_pelo_cliente: false,
    data_aceite: "2024-03-14T16:00:00.000Z",
    data_envio: null,
    data_entrega: null
  },
  {
    id: 3,
    customer_id: 4,
    produto_id: 3,
    quantidade: 3,
    preco_total: 299700,
    data_pedido: "2024-03-13T09:20:00.000Z",
    status: "Finalizado",
    aceito_pelo_vendedor: true,
    tipo_pedido: "recebido",
    recebido_pelo_cliente: true,
    data_aceite: "2024-03-13T10:00:00.000Z",
    data_envio: "2024-03-13T14:00:00.000Z",
    data_entrega: "2024-03-14T11:30:00.000Z"
  },
  // Pedidos enviados (compras)
  {
    id: 4,
    customer_id: 1,
    produto_id: 4,
    quantidade: 1,
    preco_total: 199900,
    data_pedido: "2024-03-15T08:15:00.000Z",
    status: "Pendente",
    aceito_pelo_vendedor: false,
    tipo_pedido: "enviado",
    recebido_pelo_cliente: false,
    data_aceite: null,
    data_envio: null,
    data_entrega: null
  },
  {
    id: 5,
    customer_id: 1,
    produto_id: 5,
    quantidade: 2,
    preco_total: 159800,
    data_pedido: "2024-03-12T16:20:00.000Z",
    status: "Finalizado",
    aceito_pelo_vendedor: true,
    tipo_pedido: "enviado",
    recebido_pelo_cliente: true,
    data_aceite: "2024-03-12T17:00:00.000Z",
    data_envio: "2024-03-13T09:00:00.000Z",
    data_entrega: "2024-03-14T14:30:00.000Z"
  }
];

// Main Pedidos Component
export default function Pedidos() {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const handleAcceptOrder = (orderId) => {
    console.log('Aceitar pedido:', orderId);
  };

  const handleRejectOrder = (orderId) => {
    console.log('Rejeitar pedido:', orderId);
  };

  const filteredOrders = mockOrders.filter(order => 
    order.id.toString().includes(searchTerm) ||
    formatCurrency(order.preco_total).includes(searchTerm)
  );

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow h-[calc(100vh-100px)] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Meus Pedidos</h2>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Buscar pedidos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="todos" className="w-full">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="vendas">Vendas</TabsTrigger>
              <TabsTrigger value="compras">Compras</TabsTrigger>
              <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="mt-4">
              <OrdersTable
                orders={filteredOrders}
                onAcceptOrder={handleAcceptOrder}
                onRejectOrder={handleRejectOrder}
              />
            </TabsContent>

            <TabsContent value="vendas" className="mt-4">
              <OrdersTable
                orders={filteredOrders.filter(order => order.tipo_pedido === 'recebido')}
                onAcceptOrder={handleAcceptOrder}
                onRejectOrder={handleRejectOrder}
              />
            </TabsContent>

            <TabsContent value="compras" className="mt-4">
              <OrdersTable
                orders={filteredOrders.filter(order => order.tipo_pedido === 'enviado')}
                onAcceptOrder={handleAcceptOrder}
                onRejectOrder={handleRejectOrder}
              />
            </TabsContent>

            <TabsContent value="pendentes" className="mt-4">
              <OrdersTable
                orders={filteredOrders.filter(order => order.status === 'Pendente')}
                onAcceptOrder={handleAcceptOrder}
                onRejectOrder={handleRejectOrder}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}