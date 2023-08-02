# Proyecto Final Backend Scorza

## Algunas observaciones o recomendaciones para hacer mas facil la correccion y comprension del proyecto. 

El proyecto contiene lo nescesario para realizar el proceso de compra y algunas funcionalidades extra. 

la ruta "/" redirecciona a "/productos" que es la view principal del proyecto, pero para acceder el usuario debe estar logueado.
como en un principio no se esta logueado, las redirecciones te llevan a "/register" 

para comenzar uno se registra en y una vez registrado automaticamente estas logueado, podes hacer logout con el boton al final de /productos
para probar el login sin el register. 


### Usuario ADMIN
para tener un usuario ADMIN el mail que ingresas debe contener la palabra "coder" ej:"coder@cod.com"

Recomendacion: probar con un usuario con rol ADMIN ya que hay algunas funcionalidades que no estan habilitadas a ususarios. 
Ademas, para ver de manera mas facil el flujo de stock, ya que si sos admin la view /productos muestra el stock de los productos, cosa que si sos user no se muestra. 


### Proceso de compra 
El proceso de compra comprende que sumes productos a tu carrito, y si tocas comprar, se compraran todos los productos en stock, los que no esten en stock se mantendran en tu carrito. se manda por mail confirmacion de compra(ver en logger) un detalle de la compra con un comprobante y un monto. 
Tambien se crea el ticket pedido por coder en la db. 



Ademas del sistema propuesto por coder para el armado de los tickets, idee una forma de asociar las compras a los usuarios un poco distinta. 

cada usuario tiene un campo "carritos" con un array que contiene {id de carritos y estado del carrito} esto implica que, a la hora de realizarse una compra, los usuarios tendran habilitado un unico carrito con estado pendiente y una vez realizada la compra, el carrito (con los productos comprados) se cierra y pasa a tener estado: comprado y se abre uno nuevo pendiente(en caso de no haberse podido comprar productos por falta de stock, los productos no comprados van al pendiente)
Esto es una solucion alternativa que me permitio manejar la informacion de manera mas comoda. 

### Funciones Adicionales (ADMIN)
la ruta /usuarios te muestra un resumen de todos los usuarios y sus carritos, y posee el boton de **BorrarInactivos** que eliminara de la base de datos todos los usuarios que no se hayan conectado en los ultimos 5 minutos. 

la ruta /restock tiene el boton para hacer restock de productos, todos los productos con falta de stock se le agregaran 10 unidades al stock. 

cuando un producto no tiene stock, el botoon de agregar el producto se inhabilita y pasa a mostrar "SoldOut"


