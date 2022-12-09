---
title: "Crea una Presentación Memorable con Tableau"
date: 2022-07-23T23:01:41-07:00
draft: false
author: "Hugo Belin"
categories: [software]
tags: [software]
featured_image: 'https://source.unsplash.com/JrZvYuBYzCU/'
description: Cómo hacer presentaciones más divertidas con Tableau
lang: es
---

{{< toc >}}

{{< big "¡H" >}}az que tu siguiente presentación resalte más y en lugar de usar una presentación aburrida 
de PowerPoint (nada en contra de PowerPoint :sweat_smile:) dále la oportunidad a un dashboard de 
Tableau! Vamos a hacerla mas divertida añadiendo animaciones que capturarán la atención de tu audiencia. 
Como ejemplo usaré un Tableau dashboard al estilo de *Super Mario Bros*. Mostraré como construir uno 
de estos dashboards usando algunas herramientas y trucos.

{{< head 2 "Planea Tu Presentación" >}}

{{< big E >}}ste primer paso parece obvio pero requiere de planeación y esfuerzo. Necesitarás conseguir 
lo siguiente:

- Agenda de tu presentación. Puntos a discutir, transiciones, "*diapositivas*", etc.
- Una imagen de fondo, las mejores imagenes son aquellas que te ayuden a contar tu historia o tienen 
algun tipo de progreso. Esta será un contenedor para las multiples etapas de la presentación, es 
posible enfocarse en una sección de la imagen sin revelarla completamente o iniciar con la imagen 
completa desde el principio (esto se controla en Tableau)
- Un cursor o indicador que señale el progreso de tu presentación. Este apuntará a una sección 
expecífica del mapa de acuerdo al progreso de la presentación. Esta es la oportunidad para usar 
animaciones. En el ejemplo que usaré tengo una especie de 'sprite sheet' de Mario caminando que se 
compone de 2 movimientos en cada dirección arriba, abajo, izquierda, derecha y una imagen adicional 
para el inicio de missión que servirá como punto para mostrar la siguiente diapositiva, todos estos 
serán imágenes (idealmente en formato png)
- Una imágen de fondo adicional para cada diapositiva que planees usar
- Necesitarás planear los puntos de entrada a las diapositivas en el mapa principal

{{< head 2 "Modelando Nuestra Presentación" >}}

{{< big C >}}on la información de la sección anterior podremos comenzar a darle forma a nuestra 
presentación. En esta sección explicaré como estructurar el "data source" que será consumido en 
Tableau. He usado un Google Sheet para contener la información con las siguientes columnas:

- Para hacer que Mario progrese en las distintas etapas creé un contador nombrado 
*{{< colorme Step >}}*. Esta columna contiene un simple incremento. Usaremos esta columna en el 
{{< colorme "Pages shelf" >}}.
- Necesitaremos columnas *{{< colorme "x, y">}}* ya que posicionarán a nuestro Mario en el 
mapa, explicaré como generar esta información en la siguiente sección.
- Ya que animaremos a Mario para que camine hacia arriba, abajo, izquierda, derecha y para que entre 
a misiones, usaremos cada una de las imágenes y le daremos nombre en esta columna. Necesitarás 
determinar la dirección en la que Mario camina para usar el conjunto correcto de imágenes. Esta 
columna se usará en el *{{< colorme Shapes >}}* shelf de tableau (más detalles adelante). Decidí 
nombrar esta columna *{{< colorme Index >}}*.
- Necesitaremos un campo llamado *{{< colorme Type >}}* para filtrar el texto mostrado en la 
diapositiva de acuerdo a la misión en la que Mario se encuentre.
- Para las "diapositivas" necesitamos poner el texto en una columna, para esto uso 
*{{< colorme "Slide Text" >}}*. Cada diapositiva se compone típicamente de un Título y algunos 
puntos
- Para determinar si texto es un título, subtítulo, puntos principales, etc. se usa una columna 
llamada *{{< colorme "Text Size" >}}*.

Coloca el texto de tus diapositivas en la columna *{{< colorme "Slide Text" >}}* y usaremos números 
para el tamaño del texto en la columna *{{< colorme "Text Size" >}}*. Para diferenciar el texto de 
cada diapositiva usaremos un identifiador en la columna *{{< colorme Type >}}*. Asigna un 
identificador para cada imagen de Mario y úsalo en la columna *{{< colorme Index >}}*, para nuestro 
caso a medida que Mario se mueve en el mapa se simula que *camina* al alternar dos imágenes en cada 
dirección (usé dos imágenes por simplicidad pero puedes agregar mas para tu caso y tus necesidades 
lo cual hace las transiciones más suaves). Abajo hay una imágen del data source que terminé usando:

{{< customimg src="/images/categories/tableau/data-source.png" 
caption="Nuestro Data Source de Muestra" >}}

{{< head 2 "Dibujando el Camino" >}}

{{< big E >}}n nuestro ejemplo, a medida que Mario avanza en el mapa se habilitará el texto correcto 
para la diapositiva. Para que Mario avance sobre el mapa necesitaremos trazar el camino deseado sobre 
el mapa. Esto incluye poner las coordenadas correctas sobre el mapa, nuestro mapa es el siguiente:

{{< customimg src="/images/categories/tableau/supermariow.jpeg" 
caption="Mapa sobre el cuál se moverá Mario" >}}

Para poder obtener las coordenadas he creado una pequeña herramienta en otro de mis proyectos. 
{{< link "https://brewingcats.com/es/posts/projects/software/polygonmaker/" "Polygon Maker" >}} es un 
sitio con un propósito muy sencillo: dibujar polígonos o segmentos sobre una imágen y permitir al usuario 
descargar la lista de coordenadas generadas. Sencillamente haz click en el botón 
*{{< colorme "Choose File" >}}*, selecciona la imágen del mapa y luego haz click en el botón 
*{{< colorme Load >}}* como se muestra a continuación:

{{< customimg src="/images/categories/tableau/polygonmaker.png" 
caption="Carga del Mapa de Mario en el Sitio Polygon Maker" >}}

Con el mapa cargado puedes proceder a marcar el camino que recorrerá Mario en el mapa, solo haz click 
en el botón {{< colorme Start >}} y la aplicación comenzará a grabar {{< colorme Clicks >}} hechos 
sobre la imagen. {{< colorme "Clicks con el botón derecho" >}} también se registrarán pero estos 
traerán un menu contextual que te permitirá etiquetar los clicks, de esta forma podrás diferenciar 
entre las distintas misiones (o etapas) haciendo tu trabajo más fácil. Antes de grabar recomiendo que 
selecciones la opción {{< colorme "Keep Last Used Tag" >}}, esto hará que la última etiqueta que usaste 
se aplique a los siguientes clicks de forma automática. Otro tip es que no necesitas generar cada 
paso que Mario da sobre el mapa, solo recolecta los vértices del recorrido (cada vez que la dirección 
en la que Mario se mueve cambie como las esquinas) y dado que estamos usando Google Sheets podemos 
calcular y generar cuantos puntos deseemos entre dos vértices, yo usé un incremento de 5 pixeles 
en la dirección al siguiente vértice. Una vez explicado lo anterior el recorrido de Mario sobre el 
mapa resultó ser el siguiente:

{{< customimg src="/images/categories/tableau/polygon-vertex.png" 
caption="Recorrido de Mario dibujado sobre el mapa" >}}

Ya que has registrado el recorrido sobre el mapa notarás que la lista de coordenadas y las etiquetas 
que usaste se agregaron al final de la página y existe además un link para descargar un csv. Cuando 
hayas acabado con el recorrido deseado sencillamente haz click en el enlace de descarga. 
Posteriormente deberás relacionar los vértices en cada cambio de misión (columna Type) y llenarás 
el espacio entre vértices con alguna formula sencilla (yo use un incremento de 5 pixeles en la 
dirección dada). Con la lista completa de coordenadas podrás ahora actualizar el resto de las columnas 
dentro de su "misión" o etapa correcta (si usaste la funcionalidad de etiquetas estas pueden 
corresponder a la columna Type haciendo tu trabajo más fácil). Posteriormente esparce las etiquetas para 
la animación de cada imagen de acuerdo a la dirección de Mario. Este ejercicio también te dará espacio 
para añadir el texto de las diapositivas. Ahora es momento de usar {{< colorme "¡Tableau!" >}}

{{< head 2 "Creación del Viz" >}}

{{< big C >}}on toda la información en un solo lugar es tiempo de abrir Tableau y conectar a este 
data source. Yo decidí descargar la hoja de cálculo como xlsx y usar una referencia local, pero 
también te puedes conectar a tu Google Drive desde Tableau. Despues de conectarte a tu data source 
arrastra las columnas {{< colorme "x, y" >}} sobre los shelves *rows* y *columns*. Asegurate de que 
sean agregados como *{{< colorme "Continuous Dimensions" >}}* como se muestra en la imágen. Con esto 
deberás de poder ver el recorrido que juntamos sobre el mapa en el paso anterior:

{{< customimg src="/images/categories/tableau/mario-path.png" 
caption="Visualización del recorrido de Mario" >}}

Ahora nos encargaremos del mapa del fondo. Selecciona la opción 
{{< colorme "Map >> Background Images >> (Nombre de tu data source)" >}} y haz click en 
{{< colorme "Add Image..." >}} Ingresa el path de la imagen de fondo (en nuestro caso el mapa de Mario) 
e ingresa sus dimensiones en los campos como se muestra en imágen de abajo:

{{< customimg src="/images/categories/tableau/background-map.png" 
caption="Imagen de Fondo, Mapa de Mario" >}}

Ahora deberás ver el recorrido de Mario sobre el mapa como se muestra en la imágen

{{< customimg src="/images/categories/tableau/mario-map.png" 
caption="Recorrido de Mario sobre el mapa" >}}

A continuación agregaré la columna '*Step*' (aquel contador incremental que mencioné anteriormente) al 
{{< colorme "Pages Shelf" >}}, hay que asegurarse que el control se muestre ya que usaremos este 
control para hacer que Mario se *mueva* sobre el mapa. Para animar a Mario conforme se mueve en el mapa 
usaré la columna *{{< colorme Index >}}* que contiene los identificadores que denotan los movimientos 
de Mario. Toma todas las imagenes de Mario (o la animación que vayas a usar en formato png) y colócalas 
en el siguiente directorio para hacer que Tableau reconozca las imagenes como "*shapes*": 
{{< colorme "Documents/My Tableau Repository/Shapes/Mario" >}}. Estas son las imágenes de Mario que usé:

{{< grid >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/tableau/Up1.png" caption="Up 1" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/tableau/Up2.png" caption="Up 2" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/tableau/Down1.png" caption="Down 1" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/tableau/Down2.png" caption="Down 2" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/tableau/Left1.png" caption="Left 1" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/tableau/Left2.png" caption="Left 2" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/tableau/Right1.png" caption="Right 1" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/tableau/Right2.png" caption="Right 2" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/tableau/Start.png" caption="Start Mission" >}}
  {{</ gridcol >}}
{{</ grid >}}

Arrastra la columna *Index* al {{< colorme "Marks Shelf" >}} en la tarjeta {{< colorme "Shape" >}}, 
despues haz click en la tarjeta *Shape* para editar las imágenes. De la ventana que se abre hay un 
dropdown en la parte superior derecha llamado '{{< colorme "Select Shape Palette:" >}}', expándelo. El 
nombre del directorio que usaste debera aparecer en la lista (en mi caso *Mario*). Si no se encuentra 
en la lista haz click en el botón {{< colorme "Reload Shapes" >}} para releer el contenido. Una vez 
cargadas las formas, asigna la forma correcta a cada etiqueta

{{< customimg src="/images/categories/tableau/mario-shapes.png" 
caption="Figuras de Mario Asignadas" >}}

En este punto tendremos una animación de Mario que camina sobre el recorrido que trazamos sobre el mapa. 
Usé la imágen {{< colorme "Mission Start" >}} como punto de entrada de las diapositivas que se encuentra 
en las misiones o castillos. El siguiente paso es crear un dashboard con este worksheet. El dashboard 
servirá para agregar un filtro que sincronice el contenido de la diapositiva con la posición de Mario 
en el mapa, pero también puede servirte para agregar otras ayudas visuales. A continuación mostraré cómo 
creé las diapositivas.

{{< head 2 "Viz con las Diapositivas" >}}

{{< big P >}}ara desplegar el contenido de las diapositivas primero creé un viz (worksheet) con texto 
de la siguiente manera. Arrastra la columna {{< colorme "Slide Text" >}} en 
{{< colorme "Marks Shelf >> Text Card" >}}. A continuación arrastra la columna {{< colorme "Text Size" >}} 
sobre {{< colorme "Marks Shelf >> Size Card" >}}, esto aplicará cambios al texto de acuerdo a su tipo 
títulos, subtítulos, texto regular, etc. Por ahora verás el texto de todas las diapositivas, lo 
filtraremos mas adelante. Adicionalmente arrastré {{< colorme "Text Size" >}} sobre 
{{< colorme "Marks Shelf >> Color Card" >}} para identificar los distintos tipos de texto más 
fácilmente. Escoge tu imágen de fondo para la diapositivam, esta imágen será usada en el dashboard, 
sin embargo con la imágen de fondo podemos tomar una mejor decisión sobre la escala de colores a usar 
para hacer nuestro texto más legible. La siguiente imágen muestra el texto ya con un filtro aplicado, 
tu tendrás el texto de todas las diapositivas, más adelante nos encargaremos de filtrarlo.

{{< customimg src="/images/categories/tableau/slides-viz.png" 
caption="Viz con el Texto de la Diapositiva" >}}

A continuación crea un nuevo Dashboard, arrastra el control {{< colorme Image >}} al área del dashboard 
y carga la imágen que has elegido como fondo de las diapositivas. Arrastra ahora el viz de texto que 
creamos en el paso anterior, haz este control flotante y posicionalo encima de la imágen (que estará 
en el fondo).

{{< customimg src="/images/categories/tableau/slide.png" 
caption="Dashboard para Diapositivas" >}}

{{< head 2 "Sincronización de los Dashboards" >}}

{{< big E >}}l paso final es hacer que Mario, en función de su posición en el mapa, filtre el contenido 
de la diapositiva y nos permita mostrar la diapositiva al hacer click. De esa forma podremos poner un 
alto y cambiarnos a la diapositiva activa y posteriormente resumir el progreso de Mario hasta llegar 
a la siguiente diapositiva donde el texto será actualizado, y así sucesivamente hasta terminar. El 
control del *Pages shelf* nos permite detener, regresar o incluso ir a cierto paso lo cual es útil 
al momento de la presentación. Para crear este filtro ve al dashboard que tiene el mapa (el mundo de 
Mario en mi caso) y luego haz click en {{< colorme "Dashboard >> Actions..." >}}. De la ventana 
abierta haz click en {{< colorme "Add Action >> Filter..." >}} y crea el filtro como se muestra en la 
imágen a continuación. Asegurate de correlacionar el {{< colorme Source >}} con el 
{{< colorme "Target Field" >}} en la parte inferior con la columna que agrupa el texto de la misma 
diapositiva (en mi caso 'Type'). Para que la correlación funcione asegurate de que el campo sea usado 
en los worksheets involucrados.

{{< customimg src="/images/categories/tableau/filter-action.png" 
caption="Filter Action" >}}

Lo anterior debe lograr el truco, a medida de Mario avanza, al hacer click en él el texto de la 
diapositiva será filtrado de acuerdo a la etapa en la que se encuentre Mario como se definió en la 
columna {{< colorme Type >}}.

{{< customimg src="/images/categories/tableau/final-viz.png" 
caption="Viz Final" >}}

Puedes ver mi viz en accion en 
{{< link "https://public.tableau.com/views/SuperMarioWorld/AllMap?:language=en-US&:display_count=n&:origin=viz_share_link" "Tableau Public" >}} o embebida abajo

{{< tableau "viz1670396295010" "Su" "SuperMarioWorld" "AllMap" >}}

¡Suerte con tu presentación!


{{< unsplash "JrZvYuBYzCU" "Roméo A." 
"Unsplash: Super Nintendo World in Universal Studios Japan, Osaka" >}}

{{< scrolltop >}}
{{< pageStats >}}
