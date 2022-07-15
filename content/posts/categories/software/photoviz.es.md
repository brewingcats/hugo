---
title: "Como Crear Tu Propio Foto Viz"
date: 2020-08-08T14:51:56-07:00
draft: false
author: "Hugo Belin"
featured_image: '/images/categories/software/photoviz.jpg'
categories: [software]
tags: [software]
description: Tutorial que explica como crear Dashboards de Tableau que mostrarán tus fotos de Instagram (y de otras fuentes). Paso a paso y con código de ejemplo
lang: es
---

{{< toc >}}

{{< big D >}}esempolva ese archivo de fotos y ponlas a trabajar! En este artículo voy a mostrar como poner tus fotos en un dashboard básico de Tableau que las mostrará en un mapa. 
Este mapa mostrará donde fueron tomadas esas fotos permitiéndote agruparlas y ver eventos significativos en un lugar dado y opcionalmente en función del tiempo

También exploraremos opciones para hostear tus fotos de tal forma que se puedan embeber y sean útiles para nuestro dashboard de Tableau. Queremos que los usuarios interactúen con el 
dashboard de Tableau seleccionando datos puntuales en el mapa y obteniendo la foto (o grupo de fotos) relacionada(s). Este artículo no es de ninguna manera una guía a profundidad sin 
embargo la información contenida aquí debe ser suficiente para que puedas empezar con tu propio Foto Viz, además te daré algunas ideas para perfeccionar tu trabajo (yo mísmo me encuentro 
refinando los detalles y buscando formas de mejorar el hosting de mis fotos)

En este artículo exploraré algunos de los detalles técnicos de este trabajo, así que espera revisar algo de código. Los ejemplos de código que compartiré son sin embargo, muy básicos y 
pueden ser reemplazados fácilmente por alternativas que no utilicen nada de código. El uso de estos ejemplos se centra alrededor del hosteo del sitio así como del trabajo de preparación 
para ciertos tipos de hosting de fotos. Este sitio fue construido utilizando el {{< link "https://gohugo.io/" "framework Hugo" >}} y por lo tanto algunos de los ejemplos de código fueron 
diseñados para funcionar con ese framework; si estas acostumbrado a escribir código (en JavaScript principalmente) no debe ser mayor problema adaptar los ejemplos de código a otros 
frameworks y/o sistemas

Una pequeña advertencia :grin: no soy experto de Tableau y tampoco soy super experto en código, definitivamente los métodos y ejemplos pueden ser mejorados (considera lo que veas aquí 
como V1). Este artículo sencillamente pone varios conceptos juntos y los pone a trabajar, estoy compartiendo este trabajo para que puedas utilizar estos conceptos y construir sobre ellos 
de acuerdo a tu nivel de experiencia

{{< head 1 "Mecánica del Ejercicio" >}}

{{< big H >}}ablemos de la mecánica de este ejercicio. Para poder completarlo necesitaremos las siguientes piezas de información:

{{< break >}}
- Obviamente un grupo de fotos que desees compartir. Estas fotos serán hosteadas de forma que puedan ser accedidas públicamente (en caso contrario tendrás de construir algún mecanismo de 
autorización y lo tendrás que incluir en tu dashboard de Tableau). Antes de construir el dashboard deberás decidir si quieres acceder a tus fotos de manera individual o por grupos. Localizar 
tus fotos individualmente en tu dashboard te dará un control más fino de su localización en el mapa, sin embargo esto representa más trabajo ya que necesitarás las coordenadas donde fue 
tomada cada foto. Agrupar fotos y localizarlas por grupo en el mapa de tu dashboard es mas conveniente sin embargo perderás ese control fino donde se especifica el lugar exacto donde cada 
foto fue tomada. Con fotos agrupadas cada dato puntual en el mapa tendrá coordenadas representativas de ese grupo de fotos. En este artículo exploraremos ambas opciones con ejemplos
- Latitud y Longitud de las fotos que deseas agregar a tu dashboard. Si planeas localizar fotos individuales en el mapa necesitarás las coordenadas de cada foto. Si planeas agrupar las fotos 
deberás seleccionar un lugar representativo para cada grupo de fotos. Más adelante habrá ejemplos de como obtener estas coordenadas
- Título o descripción de cada foto o grupo de fotos. Mostraremos esta información por medio de `tooltips` en nuestro dashboard
- URL para cada foto o grupo de fotos. Una vez que tengamos el hosting de las fotos tendremos esta información
- Selección de nuestra fuente de datos. Guardaremos todo lo anterior en un lugar que Tableau reconocerá como la `fuente de datos` y servirá para construir nuestro Viz

{{< head 1 "Fotos Individuales vs Fotos Agrupadas" >}}

{{< big C>}}omo se mencionó antes puedes optar for localizar fotos individuales o grupos de fotos en el Viz de Tableau. Hay varias cuestiones a considerar:

{{< grid >}}
{{< gridcol "col">}}
Fotos Individuales:
{{</ gridcol >}}
{{< gridcol "col">}}
Fotos Agrupadas:
{{</ gridcol >}}
{{< gridcol >}}{{</ gridcol >}}
{{< gridcol "col">}}
- Coordenadas de cada foto
{{</ gridcol >}}
{{< gridcol "col">}}
- Coordenadas de cada grupo de fotos
{{</ gridcol >}}
{{< gridcol >}}{{</ gridcol >}}
{{< gridcol "col">}}
- Título o descripción de cada foto
{{</ gridcol >}}
{{< gridcol "col">}}
- Título de descripción de cada grupo de fotos
{{</ gridcol >}}
{{< gridcol >}}{{</ gridcol >}}
{{< gridcol "col">}}
- URL por cada foto. Cada foto debe de poder se accedida por una URL individual (vea 'Hosting de Fotos' para más detalles)
{{</ gridcol >}}
{{< gridcol "col">}}
- URL por cada grupo de fotos. Para poder mostrar un grupo de fotos necesitarás implementar algun componente web como un carrusel o un mosaico de fotos en las que fotos individuales puedan ser 
vistas de forma selectiva (más adelante usaremos Instagram para esto)
{{</ gridcol >}}
{{< gridcol >}}{{</ gridcol >}}
{{< gridcol "col">}}
- Cada foto es localizada por un dato puntual en el mapa
{{</ gridcol >}}
{{< gridcol "col">}}
- Cada grupo de fotos es localizado por un dato puntual en el mapa
{{</ gridcol >}}
{{</ grid >}}
{{< break >}}

{{< head 1 "Cómo Obtener Coordenadas de Fotos Individuales" >}}

{{< big S >}}i las fotos que quieres compartir fueron tomadas con un teléfono celular es muy probable que puedas ver el lugar donde fue tomada cada foto. Para este ejercicio utilizaremos 
esas coordenadas en grados decimales (no en grados con formato `hora-minuto-segundo`). Si tu celular registra esta información en formato `HH:MM:SS` necesitarás convertir a grados decimales 
utilizando esta {{< link "https://www.fcc.gov/media/radio/dms-decimal" "herramienta en línea" >}}. Hay múltiples formas de obtener las coordenadas de tus fotos, aquí algunas de ellas:
- Por medio del uso de una aplicación que nos permita leer el metadata de tus fotos (yo use esta aplicación: 
{{< link "https://apps.apple.com/us/app/exif-metadata/id1455197364" "EXIF Metadata para iOS" >}})
- Transfiere tus fotos a una PC o Mac y lee su metadata desde ahí. Fotos transferidas en formato `.HEIC` usualmente incluyen metadata con las coordenadas. En Mac OS puedes ver la foto en `Finder`, 
asegurate de que el panel de `Preview` se muestre, selecciona la foto y en ese panel desliza por los detalles hasta encontrar las coordenadas. De nuevo, si el formato esta en `HH:MM:SS` utiliza 
esta {{< link "https://www.fcc.gov/media/radio/dms-decimal" "herramienta en línea" >}} para hacer la conversión

{{< customimg src="/images/categories/software/photoviz/metadatamac.jpg" caption="Coordenadas de una Foto a partir de su Metadata en Mac OS" >}}

- Transfiere tus fotos a una Mac y lee su metadata en la línea de comandos. Mac OS incluye una utilidad de línea de comandos llamada `mdls` que lee metadata de archivos dados. Si tienes una 
cantidad grande de fotos que quieres incluir puedes escribir fácilmente un script que mande llamar esta utilidad para cantidades grandes de fotos (te dejo los detalles de ese script a ti :wink:). 
Para leer el metadata solo tienes que pasar el nombre y directorio completos de un archivo a `mdls`, busca las propiedades `kMDItemLatitude` y `kMDItemLongitude` en la información regresada por 
el comando. Puedes revisar la {{< link "https://ss64.com/osx/mdls.html" "guía de ese comando aquí" >}}

{{< customimg src="/images/categories/software/photoviz/mdls.jpg" caption="Lectura de las coordenadas de fotos utilizando el comando mdls" >}}

- Una solución que funciona en iOS y Android es utilizando {{< link "https://photos.google.com/" "Google Fotos" >}}. En iOS puedes ver fácilmente las coordenadas donde tus fotos fueron tomadas, 
solo abre la aplicación, abre una foto dada que desees compartir y muestra los detalles de esa foto (en tu navegador el proceso es similar, sencillamente expande el mapa mostrado en los detalles 
y este tendra los detalles de las coordenadas de la imagen)

{{< grid >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/metadataios1.jpg" caption="Aplicación de Google Fotos, viendo los detalles de la foto" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/metadataios2.jpg" caption="Coordenadas de una foto en la aplicación de Google Fotos" >}}
  {{</ gridcol >}}
{{</ grid >}}

{{< head 1 "Cómo Obtener las Coordenadas de un Grupo de Fotos" >}}

{{< big P >}}ara tener nuestras fotos agrupadas lo que haremos será usar {{< link "https://www.google.com/maps/" "Google Maps" >}}. El primer paso será decidir qué fotos pertenecerán a qué 
grupo y crear esos grupos de fotos, para cada grupo deberás seleccionar un lugar representativo. Para ello haga click en {{< link "https://www.google.com/maps/" "Google Maps" >}} en el lugar 
seleccionado para un grupo de fotos dado, esto creará un pin en el mapa, cuando lo anterior ocurra en la parte inferior del mapa se mostrarán las coordenadas del pin (vea la siguiente foto), 
sencillamente tome esas coordenadas para representar al grupo de fotos

{{< customimg src="/images/categories/software/photoviz/gmapspoint.jpg" caption="Coordenadas de un pin en Google Maps" >}}

Si tu grupo de fotos esta relacionado con un lugar en específico (como un parque o algún sitio histórico) este lugar puede ser encontrado fácilmente en 
{{< link "https://www.google.com/maps/" "Google Maps" >}}. Sin embargo, no hay reglas en esto y puedes localizar grupos de fotos donde quieras

{{< head 1 "Hosting de Fotos" >}}

{{< big E >}}l primer punto a resaltar aquí es que las fotos que desees hostear para tu dashboard de Tableau deben poder tener URLs públicas para propósito de esta guía (cabe señalar que con 
un poco de conocimiento puedes incluir mecanismos de autorización dentro de tu dashboard de Tableau o controlar el acceso a esas fotos aplicando otros mecanismos de acceso en el objeto web 
embebido). Este sitio web particular se encuentra hosteado en {{< link "https://about.gitlab.com/stages-devops-lifecycle/pages/" "GitLab Pages" >}} (ampliamente recomendado :heart_eyes:) 
así que fue naturalmente mi primera opción el incluir las imágenes directamente en {{< link "https://about.gitlab.com/stages-devops-lifecycle/pages/" "GitLab Pages" >}} en un directorio en el 
repositorio. Y aunque incluir imágenes en esta plataforma es bastante sencillo (las imágenes están disponibles con tan solo unos cuantos comandos de `git`), no pensé a detalle en las 
implicaciones del rendimiento del sitio (si deseas ver un ejemplo del impacto al rendimiento puedes ver mi artículo sobre 
{{< link "/es/posts/categories/travel/2019sandiego/" "San Diego" >}} donde los tiempos de carga son demasiado largos), cuando se agregan imágenes en cantidades grandes o de resoluciones altas 
el desempeño se afecta gravemente. Si no planeas tener muchas imágenes en tu sitio y las imágenes no son de resoluciones muy altas 
{{< link "https://about.gitlab.com/stages-devops-lifecycle/pages/" "GitLab Pages" >}} puede ser una opción para ti, el proceso es muy sencillo y rápido (se requieren conocimientos básicos de 
`git`)

Idealmente para hostear imágenes en tu sitio web, este debe estar en modo de producción y con todas las bondades que ello implica (usar un CDN, tener Geo-replicación, balanceo de tráfico, 
etcétera, ya sabes lo básico :wink:). Usualmente este tipo de sitios están ya sea, ofertados por un proveedor terciario o desarrollado por un equipo de profesionales con buena cantidad de 
recursos. Para nosotros los mortales tenemos tres opciones: proveer un sitio web con un desempeño pobre, pagar por tener un desempeño decente, o encontrar un compromiso (mover elementos que 
impactarán negativamente el desempeño de tu sitio a otra plataforma y/o servicio y mantener los elementos de tu sitio que no impactan el rendimiento de forma significativa. Eventualmente 
llegaremos a este tipo de compromiso en este artículo)

Exploremos algunas otras opciones

{{< head 3 "Unsplash" >}}
{{< big A >}}lmacenamiento de tus imágenes en {{< link "https://unsplash.com/" "Unsplash" >}}. {{< link "https://unsplash.com/" "Unsplash" >}} es una excelente plataforma para el almacenamiento 
de imágenes, ofrece todas las ventajas de un sitio web de producción (incluso puedes obtener las imágenes en diferentes resoluciones ahorrándonos este trabajo y permitiéndonos optimizar aun 
más el desempeño). Es muy fácil obtener URLs que se pueden compartir (sin el contenido de la interface de Unsplash). Unsplash tiene algunas desventajas:
- Las fotos no solo son públicas (necesitamos URL públicas para nuestro dashboard de Tableau) también se encuentran indexadas y accesibles a motores de búsqueda. El propósito de 
{{< link "https://unsplash.com/" "Unsplash" >}} es la distribución libre de imágenes de modo que cada fotografía que se sube a la plataforma es fácil de descubrir (a diferencia de que las 
imágenes aunque públicas, no son tan fáciles de descubrir por motores de búsqueda cuando son hosteadas por cuenta propia), para usar Unsplash tienes q estar cómodo con con estos términos
- Las fotos que se suben a la plataforma son sujetas a la {{< link "https://unsplash.com/license" "Licencia de Unsplash" >}} la cual otorga derechos a cualquiera de usarlas y modificarlas 
para cualquier propósito (personal o comercial). Tus fotos pueden terminar en productos comerciales y debes estar de acuerdo con estos términos para usar el servicio
- Tampoco puedes subir cualquier foto a la plataforma. Fotos demasiado similares (como aquellas que toman objetos desde ángulos ligeramente distintos) son removidas para mantener una alta 
calidad en las imágenes del servicio. Tampoco se pueden subir imágenes que tenga contenido reservado por medio de derechos de autor, el servicio también remueve este tipo de imágenes
- Si estas de acuerdo con todo lo anterior, usar {{< link "https://unsplash.com/" "Unsplash" >}} es bastante sencillo para localizar fotos individualmente en nuestro mapa. Lo anterior también 
significa que si quieres localizar fotografías por grupos eso requiere de trabajo adicional. Típicamente esto requiere de algún componente web que te permita ver fotos individuales en el 
grupo (una opción para esto es crear un {{< link "https://getbootstrap.com/docs/4.5/components/carousel/" "carrusel de Bootstrap" >}} que cargue las imágenes a partir de `query parameters` las 
cuales sean pasadas desde nuestro dashboard de Tableau. Haremos algo similar más adelante en este artículo. Si usas el framework {{< link "https://gohugo.io/" "Hugo" >}} puedes tomar este 
carrusel como punto de partida para tu trabajo que es mi {{< link "https://gohugo.io/content-management/shortcodes/" "short-code" >}} que implementa un 
{{< link "https://gist.github.com/hobelinm/c7249acf3c20b09228a5911aa00483b0" "componente de carrusel" >}} para este tipo de sitios)

{{< head 3 "Instagram" >}}
{{< big O >}}tra opción es subir tus fotos a {{< link "https://www.instagram.com" "Instagram" >}} y acceder a ellas desde tu Viz. {{< link "https://www.instagram.com" "Instagram" >}} es una 
plataforma bastante popular que se encarga de las complejidades del hosting (replicación, disponibilidad, etcétera) y te da las características de un sitio de producción. El contenido de 
{{< link "https://www.instagram.com" "Instagram" >}} en tu Viz puede constar de fotos individuales o grupos de fotos sin trabajo adicional. Con esta opción podrás ver tus fotos sin embargo 
estas incluirán la interfaz de usuario de {{< link "https://www.instagram.com" "Instagram" >}} en todo momento y no existe la oportunidad de ocultarla (después de todo ellos quieren que 
termines usando su plataforma directamente). El uso de {{< link "https://www.instagram.com" "Instagram" >}} no es una mala idea si deseas construir tu presencia online, tu marca, o tu sitio web. 
Puedes mover e intercambiar el tráfico entre tu perfil de {{< link "https://public.tableau.com/s/" "Tableau Public" >}} :left_right_arrow: tu perfil de 
{{< link "https://www.instagram.com" "Instagram" >}} :left_right_arrow: tu sitio web lo cual te permite extender tu red de alcance en la web, al final de cuentas el contenido es el que manda, 
¿cierto? Puedes explotar el uso de los :hash:hashtags para atraer tráfico a Instagram el cual a su vez puede llevar tráfico a tu perfil de Tableau o tu sitio web (usa el campo de `Home Page` 
para ello). Un requerimiento para que esto funcione es que tu perfil de Instagram debe ser público para que las fotos embebidas puedan ser mostradas. Como bono adicional si tu cuenta de 
Instagram se convierte en un perfil de negocios puedes obtener telemetría desde la aplicación la cuál te provee de conocimiento adicional sobre el tráfico a tu perfil/sitio (puedes ver el 
ejemplo de abajo para uno de mis {{< link "https://www.instagram.com/super.m4n/" "perfiles de negocios" >}})

{{< grid >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/instainsights1.jpg" caption="Botón de Análisis en Perfiles de Negocios" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/instainsights2.jpg" caption="Análisis de Actividad" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/instainsights3.jpg" caption="Análisis de Seguimientos" >}}
  {{</ gridcol >}}
{{</ grid >}}

Hay algunas cosas que debemos considerar cuando queremos embeber fotos desde Instagram. Estas sujeto a sus términos de uso. Cargar las fotos directamente via URL de la foto puede funcionar en 
Tableau Desktop sin embargo una vez que publicas el Viz a la web, el objeto web que contiene las fotos se convierte en un `iframe` que es detectado y bloqueado por Instagram. Para poder embeber 
fotos de Instagram necesitamos crear una {{< link "https://developers.facebook.com/" "cuenta de desarrollador de Facebook" >}}, crear una Aplicación, y finalmente añadir el producto `oEmbed` a 
la aplicación. Una vez que se completaron los pasos anteriores tendremos acceso a llamar su API las cuales nos proveerán con el fragmento de `HTML` que necesitamos para embeber las fotos. 
Ciertamente no es el proceso más sencillo sin embargo tampoco es cosa del otro mundo :wink:

{{< customimg src="/images/categories/software/photoviz/embedrefuse1.jpg" caption="Instagram rechaza mostrar fotos dentro de un iframe" >}}

{{< head 3 "Opciones Que No Funcionaron" >}}
{{< big T >}}ambién exploré el uso de {{< link "https://photos.google.com/" "Google Photos" >}} para contener las fotos que serían accedidas por nuestro Viz. Aunque esto funcionó en Tableau 
Desktop, una vez que publicas, el Viz resultante tiene el contenido de la foto bloqueada por Google una vez que este detecta que se encuentra en un `iframe` (vea la foto de arriba). Una 
diferencia clave con Instagram es que no hay API para clientes web para Google Photos, se necesita hostear un servidor de backend que ejecute las llamadas de API y envíe el resultado de la 
llamada al cliente web, y dado que no tengo ninguna infraestructura de backend esto no es una opción para mi. Si aun así deseas tomar esta ruta y la haces funcionar dejanos saber agregando tu 
comentario al final

{{< head 1 "Como Hacemos Funcionar Instagram" >}}

{{< big M >}}e concentraré en embeber fotos de Instagram ya que las otras opciones son bastante sencillas y directas de modo que no tendrás problema al implementarlas o son muy personalizadas 
y en ese caso tu eres el experto si decides seguirlas. Si no quieres usar Instagram puedes saltarte esta sección. En este punto ya debemos haber decidido si mostraremos nuestras imágenes de 
forma individual o en grupos; si decidiste localizar las fotos individualmente publica cada foto individualmente en tu cuenta de Instagram, si optaste por grupos de fotos puedes crear 
publicaciones que contengan todas las fotos en un grupo. En esta sección mostrare como poder embeber contenido de Instagram

{{< head 3 "Cuenta de Desarrollador de Facebook" >}}

{{< big D >}}e nuevo si utilizas la URL de la foto directamente en Tableau Desktop _sí_ va a funcionar, pero tan pronto publiques ese Viz Instagram bloqueará las fotos. Para resolver estos 
problemas tenemos que seguir algunos pasos:
- Crea una cuenta de {{< link "https://developers.facebook.com/" "Desarrollador de Facebook" >}}, puedes usar tus credenciales regulares de Facebook para esto
- {{< link "https://developers.facebook.com/docs/apps#register" "Crea una aplicación nueva" >}} la que usaremos para acceder a Instagram, puedes añadir una aplicación desde 
{{< link "https://developers.facebook.com/apps/" "tu dashboard" >}}

{{< grid >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/newapp.jpg" caption="Crea una nueva aplicación en el Portal de Desarrolladores de Facebook" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/newapp2.jpg" caption="Selecciona el tipo de aplicación que deseas registrar" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/newapp3.jpg" caption="Provee los detalles para tu aplicación" >}}
  {{</ gridcol >}}
{{</ grid >}}

- Una vez que hayas creado tu aplicación puedes añadirle el producto `oEmbed`. De la lista de productos seleccionalo y haz click en 'Set Up', verás la imágen de abajo

{{< grid >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/oembedproduct.jpg" caption="Selecciona el Producto oEmbed" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/oembeddone.jpg" caption="Producto oEmbed Añadido" >}}
  {{</ gridcol >}}
{{</ grid >}}

- Regresa al dashboard de tu aplicación (el botón que dice Dashboard a la izquierda), verás las estadísticas de la aplicación

{{< customimg src="/images/categories/software/photoviz/appdashboard.jpg" caption="Dashboard de la Aplicación" >}}

- Lo único que nos falta es mover nuestra aplicación de `Development` a `Live`. Cuando mueves el switch es posible que tengas alertas sobre acciones adicionales que debes tomar, simplemente 
síguelas y no tendrás más problemas

{{< grid >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/devlivemode.jpg" caption="Cambiar a modo Live" >}}
  {{</ gridcol >}}
  {{< gridcol >}}{{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/applivemode.jpg" caption="Modo Live se encuentra habilitado" >}}
  {{</ gridcol >}}
{{</ grid >}}

- A continuación necesitaremos dos campos que son necesario para poder hacer llamadas API al sistema `oEmbed`. Uno de ellos es el `App ID` el cual se muestra junto al botón `Live`. El segundo 
campo es el `Client Token`, este campo se puede obtener en el menú de la izquierda `Settings -> Advanced`

{{< head 3 "Usando el API de Instagram" >}}

{{< big Y >}}a con la información necesaria podemos proceder a crear una librería que haga el trabajo que necesitamos. Una vez creada la librería la podremos llamar en el 
{{< link "https://gohugo.io/" "framework de Hugo" >}}, si usas otro sitio, plataforma, o sistema aún puedes usar la librería y puedes omitir los detalles relativos al framework de Hugo, las 
llamadas a la librería se pueden traducir fácilmente a tu sistema. La librería que cree es bastante simple, expone dos métodos, uno para extraer la foto ID de Instagram de los `query parameters` y el otro método es para llamar al API de Instagram para obtener el fragmento de `HTML` necesario para desplegar la foto de Instagram de forma embebida. La librería está escrita en TypeScript la 
cual se transpila fácilmente a JavaScript, utiliza su propio `namespace` para evitar mezclarse con otras piezas de JavaScript siendo ejecutadas en la página. También puede ser utilizada para 
embeber fotos conocidas al momento de la creación de artículos (no solo en tiempo de ejecución). La librería utiliza un selector de un párrafo el cual es reemplazado por la foto de Instagram 

{{< customimg src="/images/categories/software/photoviz/autoinstagram.jpg" caption="Librería de Auto Instagram" >}}

Para usarla:
- Actualiza `AutoInstagram.LocalConstants.AppTok` con el `App ID` que obtuvimos previamente y `AutoInstagram.LocalConstants.CliTok` con el `Client Token` también obtenido previamente
- Transpila la librería Auto Instagram
- Añade la librería de `Instagram embed` a tu sitio o página:
- `<script type='text/javascript' src="//www.instagram.com/embed.js" ></script>`
- Añade nuestra librería a tu sitio o página
- En tu página o artículo puedes obtener el Instagram ID cuando se le incluye en el URL con el `query parameter`: `?insta=<postId>`. Para obtener este `<postId>` incluye la siguiente llamada:
- `window.AutoInstagram.Control.LoadFromParam()`
- En su forma actual puedes reemplazar cualquier párrafo `<p>` con un texto dado para que la librería lo reemplace con la foto de Instagram. Internamente se construye un selector que busca 
ese nodo en la página y reemplaza el código. Por ejemplo, dado este párrafo: `<p>Insertar-Instagram-Aqui</p>` será reemplazado con la foto de Instagram cuando se llama a la librería de esta 
forma:
- `window.AutoInstagram.Control.QueryAndAddInstagramPost('<postId>', 'Insert-Instagram-Here');`
- Si gustas puedes modificar la librería para usar cualquier otro selector

Puedes ver los contenidos de la librería en {{< link "https://gist.github.com/hobelinm/ce7ebdb0dc601a05542376eeb393e378" "este Gist" >}}

Como puedes ver es muy sencillo :wink:

{{< head 3 "Integrando Nuestra Librería con Hugo" >}}

{{< big O >}}k sabemos como hacer llamadas al API de Instagram para insertar fotos de Instagram en nuestra página web. Más adelante usaremos esta habilidad para embeber esta página en nuestro 
dashboard de Tableau (en lugar de Instagram directamente). Personalmente he incluido esos Vizzes en otras páginas de esta forma:

{{< customimg src="/images/categories/software/photoviz/embedchain.jpg" caption="Integrando Componentes Estilo Inception" >}}

A continuación mostraré como le hice para crear una página "especial" que contendrá unicamente la foto de Instagram embebida y cuyo trabajo sea mostrar la foto indicada de 
Instagram por medio de los `query parameters` en tiempo de ejecución (nótese que Hugo ya provee un shortcode para 
{{< link "https://gohugo.io/content-management/shortcodes/#instagram" "insertar artículos de Instagram" >}} sin embargo los identificadores de las fotos deben ser conocidos a la hora de crear 
el artículo que haga uso de él y en nuestro caso cambiaremos de fotos de forma dinámica según lo indique nuestro Viz). Ya que las fotos serán embebidas en nuestro Viz de Tableau finalmente y 
dado que la interfaz de usuario de Instagram no puede ser ocultada debemos reservar todo el espacio que nos sea posible para el contenido de Instagram. Por ello esta página deberá ocultar 
todos los elementos de la interfaz que componen cada página normalmente (la barra de navegación en la parte superior, título, los botones sociales, el plugin de discusión, el footer, etcétera). 
Note que estoy usando el {{< link "https://gohugo-ananke-theme-demo.netlify.app/" "Ananke Theme" >}} que se sugiere por default por la 
{{< link "https://gohugo.io/getting-started/quick-start/" "guía de instalación de Hugo" >}}. Cree una copia local y modificada de los siguientes archivos del tema para habilitar esconder las 
piezas de la interfaz cuando sea necesario

{{< customimg src="/images/categories/software/photoviz/baseof.jpg" caption="baseof.html - Permite ocultar el footer" >}}

El resto de los cambios se hicieron en `single.html` y por motivos de simplicidad puedes verlos {{< link "https://gist.github.com/hobelinm/11b327cccac1ab5a5201bff6614ad188" "aquí" >}}. Ahora 
que tenemos la opción de esconder las piezas de la interfaz de usuario, nuestra página especial será un simple artículo sin imagen de encabezado y con el siguiente switch en el `front matter`: 
`barePage: true`. Ahora necesitaremos un shortcode que nos permita conectar nuestro artículo con la librería que ya añadimos en la sección anterior. Este shortcode tomará dos parámetros: el 
primero indicará si extraer el foto ID de los `query parameters` y el segundo los contenidos del párrafo que será reemplazado y que servirá para construir el selector

{{< gist hobelinm 667e929b1de8b57eabf360bb1781bb9d >}}
{{< caption "Shortcode para conectar artículos con nuestra librería de Instagram" >}}

Finalmente llamaremos a este shortcode desde nuestra página especial, asi es como se ve:

{{< gist hobelinm 6de724ebfc80560db7c8da05141fc571 >}}

La página especial puede ser vista {{< link "/posts/instagram/" "aquí" >}}. Puedes añadir `?insta=<postId>` a la URL para cargar fotos de Instagram, siéntase libre de intentarlo. Si deseas 
ayuda obteniendo los IDs de fotos de Instagram {{< link "https://brewingcats.com/es/posts/projects/software/instaparser/" "creé un artículo" >}} que detalla los pasos y te ayuda a extraer esos 
IDs y visualizar como se cargan, siéntase en libertad de revisarlo. Igualmente si no quiere construir nada de esta infraestructura por usted mismo siéntase en libertad de usar mi 
{{< link "/posts/instagram/" "página especial" >}} para sus Vizzes de Tableau, de nuevo, puedes obtener ayuda con los IDs en este 
{{< link "https://brewingcats.com/es/posts/projects/software/instaparser/" "artículo de Brewing Cats" >}}. ~~Finalmente puedes ver el código en funcionamiento aqui:~~

Instagram-Embebido-Y-Funcionando-Aqui

{{< autoinstagram "CC7iPq7p5HW" "Instagram-Embebido-Y-Funcionando-Aqui" >}}

{{< head 1 "Creando Nuestro Data Source" >}}

{{< big F>}}inalmente tenemos todo lo necesario para comenzar a trabajar en nuestro Viz de Tableau. En esta sección detallaré como organicé la informacion para ser consumida por nuestro Viz de 
Tableau. Tienes muchas opciones respecto al formato a usar `.txt`, `.csv`, `.xlsx`, local. Yo decidí usar {{< link "https://www.google.com/sheets/about/" "Google Sheets" >}} debido a que es 
bastante conveniente y fácil de actualizar. Conectar Tableau a cualquiera de estos Data Sources es bastante sencillo. La información que hemos recopilado a lo largo de este artículo fué 
organizada de la siguiente manera en columnas:

- Latitud
- Longitud
- Título o descripción de la foto o grupo de fotos
- Fecha de la foto o grupo de fotos
- URL de las fotos. En esta ocasión utilizaré los IDs de las fotos de Instagram ya que nuestro shortcode ensambla la URL completa (puedes obtener los IDs de las fotos 
{{< link "https://brewingcats.com/es/posts/projects/software/instaparser/" "aquí" >}})

{{< customimg src="/images/categories/software/photoviz/gsheets.jpg" caption="Ejemplo de Google Sheets" >}}

{{< head 1 "Manejando el Contenido del Tamaño Embebido" >}}

{{< big U >}}na vez que se ha resuelto donde hostear la imagen, si resulto ser directamente sobre un 
sitio web, el añadirla directamente a Tableau resultará en un contenedor con la imagen original la 
cual puede o no caber en el área designada. Para ajustarla automáticamente al tamaño designado es 
necesario utilizar otro contenedor que le indique el tamaño disponible. Este sitio tiene la 
funcionalidad necesaria para lograrlo. El contenedor de Tableau dictará el espacio disponible, a su 
vez este contenedor deberá cargar la imagen desde la fuente (la imagen debera ser accesible al 
dominio) e indicar el espacio disponible, esto ajustará la imagen al espacio disponible. Abajo puede 
encontrar controles para generar esta URL

{{< embedencoder >}}

{{< head 1 "Creación del Viz" >}}

{{< big A>}}bra la aplicación de Tableau Public desde su escritorio y conéctese a su data source. Agregue la tabla adecuada y vaya a `Sheet 1`

{{< customimg src="/images/categories/software/photoviz/connectgsheets.jpg" caption="Conectándonos a Google Sheets" >}}

En la hoja de trabajo arrastre el campo de `Longitude` hacia el estante de Columns, luego arrastre el campo de `Latitude` al estante de Rows. Asegurese de que ambos campos en los estantes se 
encuentren como `Dimensions` y `Continuous`. Si el área del Viz no ha cambiado a un mapa, vaya al estante de `Marks`, y desde el campo deplegable que dice `Automatic` cambielo a `Map`

{{< customimg src="/images/categories/software/photoviz/vizmap.jpg" caption="Mapa construido usando los campos Latitude y Longitude" >}}

Necesitaremos el resto de los campos para crear acciones y añadir mas información, arrastre los siguientes campos al botón `Detail` que esta en el estante de `Marks`: `Name`, `Instagram`, 
y `Date`, para el campo de `Date` cambielo a `Exact Date` y `Continuous`. Para agregar algo de color arrastre el campo  `Date` al botón de `Color` en el estante de `Marks`, esto pondrá un color 
en los datos puntuales en el mapa de acuerdo a su fecha. Yo use `Year` como granularidad para ver que eventos fueron tomados en ciertos años. Nombremos nuestra hoja de trabajo `Map`

{{< customimg src="/images/categories/software/photoviz/vizmap2.jpg" caption="Todos los Campos Agregados al Mapa" >}}

También añadiremos una etiqueta para los campos de `Name` y `Date` en nuestro dashboard, sin embargo estas etiquetas vendrán de distintas hojas de trabajo. Creemos una nueva hoja de trabajo 
llamada `Date`, arrastre el campo `Date` al botón `Text` dentro del estante de `Marks` (de nuevo usamos `Exact Date` y `Continuous`). Arrastre los campos `Instagram`, `Latitude`, y `Longitude` 
en el botón de `Details` en el estante de `Marks` para traerlos al contexto (asegurese de que Latitude y Longitude estén como `Dimension` y `Continuous`). Cree otra hoja de trabajo para `Name` 
y repita los mismos pasos

{{< grid >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/vizdate.jpg" caption="Hoja de Trabajo Date" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/vizname.jpg" caption="Hoja de Trabajo Name" >}}
  {{</ gridcol >}}
{{</ grid >}}

Vamos a crear el dashboard ahora! Asegurese de darle un nombre relevante ya que este sera el nombre resultante de su Viz

- En el dashboard, desde el panel de la izquierda que contiene la lista de hojas que ya hemos creado. Arrastre la hoja `Map` al área de dashboard para traer el mapa
- En el panel de la izquierda ajuste el `Size` (tamaño) del área de nuestro dashboard (yo usé automático para que el dashboard tomara toda el área)
- En el panel de la izquierda de la lista de `Objects` (Objetos) arrastre `Web Page` al área del dashboard y arréglela como desee (yo use el lado izquierdo para el mapa y el lado derecho para 
el contenido web), puedes usar cualquier URL ya que la cambiaremos más adelante para contener a nuestras fotos
- Selecciona el área `Year of Date` y de los botones que aparecen en la zona selecciona la flecha desplegable y luego `Floating` para optimizar el espacio, luego mueva el area hacia el mapa
- En la zona del mapa haga click derecho en el título y seleccione `Hide Title` para optimizar el espacio aún más (es obvio que es un mapa)
- Arrastre las hojas `Name` y `Date` en el área de dashboard, hágalas `Floating` sobre el mapa para optimizar espacio, también puede usar `Fit Width`
- Esconda todas las hojas de trabajo haciendo click derecho en la pestaña del dashboard y luego en `Hide All Sheets`

{{< customimg src="/images/categories/software/photoviz/dashboard1.jpg" caption="Dashboard Resultante" >}}

{{< head 1 "Luces, Cámara, ... Acciones!" >}}

Añadamos algunas acciones, la primera de ellas nos permitirá cargar las fotos en nuestro componente web. Si vas a añadir fotos via URL directamente solo usa ese URL directamente como se provee 
por medio del data source, para nuestro caso ensamblaremos el URL a partir del ID de la foto de Instagram el cual será pasado via `query parameter` a la página especial que creamos, esta página 
contendrá la foto embebida y a su vez esta página será embebida en nuestro Viz. Para crear la acción sigue los siguientes pasos:

- Abre el menú `Dashboard -> Actions...`
- Click `Add Action >`
- Selecciona `Go to URL...`
- Añade un nombre para tu acción, digamos `View`
- La accion debe de ejecutarse en tu dashboard y con la acción `Select` (cuando se seleccione un dato puntual en el mapa)
- Para el campo de URL puedes usar el URL si así está tu data source o en nuestro caso solo tenemos los IDs de las fotos de modo que nuestro URL se verá de la siguiente forma (nota que 
`<Instagram>` es el nombre del campo que usamos, este puede ser diferente para tu caso, puedes ver los campos en la flecha de la derecha):
- `https://hugobelin.com/posts/instagram/?insta=<Instagram>`
- En la sección de `URL Target` habilita `Web Page Object` para usar el componente web que ya habiamos colocado en el dashboard
- Click en `OK` para completar esta acción. En el dasboard deberás ver que se carga la foto en el componente `Web Page` cuando haces click en alguno de los datos puntuales del mapa

{{< customimg src="/images/categories/software/photoviz/action1.jpg" caption="Acción en el Dashboard Carga Nuestra Foto" >}}

Las siguientes acciones son opcionales pero mejorarán la usabilidad en pantallas mas pequeñas y si decides embeber este Viz. Añadiremos dos acciones, una para ver el dato puntual en 
{{< link "https://www.google.com/maps/" "Google Maps" >}}, el otro para abrir la foto de Instagram en una nueva pestaña del navegador. Para ambas acciones:

- Serán acciones de tipo `Go To URL...`
- Correran para nuestro dashboard actual
- Estarán disponibles via `Menu` (cuando hagas click en el dato puntual aparecerá un menú con la opcion)
- La área de `URL Target` tendrá `New Browser Tab` seleccionado
- Una tendra por nombre 'Open Location in Maps' y la otra 'Open Instagram'

Cada acción tendrá un campo de URL distinto, para abrir Google Maps:
- `http://www.google.com/maps/place/<Latitude>,<Longitude>`

Para abrir Instagram:
- `https://www.instagram.com/p/<Instagram>/`

{{< grid >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/actioninsta.jpg" caption="Acción para Abrir Instagram" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< customimg src="/images/categories/software/photoviz/actionmaps.jpg" caption="Acción para ver el Lugar en los Mapas" >}}
  {{</ gridcol >}}
{{</ grid >}}

{{< customimg src="/images/categories/software/photoviz/dashboardactions.jpg" caption="Dashboard con sus Acciones Funcionando" >}}

Finalmente necesitamos crear un filtro conocido como {{< link "https://help.tableau.com/current/pro/desktop/en-us/actions_filter.htm" "filter action" >}}. Esta acción nos permitirá sincronizar 
los datos puntuales seleccionados en el mapa con las hojas de `Name` y `Date`. Selecciona la zona del mapa en el área de tu dashboard y en los controles de la misma haz click en el ícono de 
`Filter` que tiene la leyenda `Use as a Filter` cuando pasas el ratón por encima, una vez habilitado al seleccionar un dato puntual en el mapa se deben de filtrar las etiquetas de las hojas 
para mostrar solo el elemento seleccionado (puedes jugar con el formato de estas etiquetas para hacerlas más grandes)

{{< customimg src="/images/categories/software/photoviz/dashboardfinal.jpg" caption="Dashboard Resultante con un Dato Puntual Seleccionado" >}}

Ahora estamos listos para publicar nuestro libro de trabajo (workbook) y usarlo como deseemos. Como lo mencioné anteriormente mi plan es embeber estos Vizzes en mis artículos para crear una mejor 
experiencia. Abajo puedes ver dos ejemplos de Vizzes embebidas, una usando 
{{< link "https://public.tableau.com/profile/hugo.belin#!/vizhome/SanDiego_15741313638760/SanDiego" "fotos puntuales" >}} y la otra usando 
{{< link "https://public.tableau.com/profile/hugo.belin#!/vizhome/HikeCollection/Hikes" "grupos de fotos" >}}

{{< head 1 "Como Embeber el Viz Resultante" >}}

{{< big T >}}écnicamente en este momento hemos terminado, así que puedes considerar esta sección opcional. Para extender el uso de nuestra Viz ya publicada la usaré en páginas que las 
usen para enriquecer la experiencia. En esta sección detallaré como le hice para embeber vizzes de Tableau en artículos del framework Hugo. Para conectar los Vizzes de Tableau en nuestros 
artículos cree un shortcode personalizado que toma ciertos parametros que se obtienen del código para compartir que nos da Tableau para embeber. Este es el shortcode:

{{< gist hobelinm de089f99c3543e2a16f8f24fee4d958e >}}

En el Viz publicado hay un botón de compartir que nos da el código. De ese código utilizaremos ciertos campos que le serán pasados a nuestro shortcode (estoy trabajando en una herramienta 
para extraer esos campos de forma automática). Como ejemplo puedes ver 
{{< link "https://public.tableau.com/profile/hugo.belin#!/vizhome/HikeCollection/Hikes" "mi colección de caminatas" >}}, haciendo click en el ícono de compartir en la parte de abajo obtienes un 
campo de texto con el código para embeber, de ahi obtenemos los campos que se muestran en la segunda foto de abajo

{{< customimg src="/images/categories/software/photoviz/vizshare.jpg" caption="Cómo obtener el código para embeber un Viz" >}}

{{< customimg src="/images/categories/software/photoviz/vizsharecode.jpg" caption="Campos del código para embeber que usamos para el shortcut" >}}

Con ellos mando llamar a mi shortcode de esta manera:

`{< tableau "viz1595830498772" "Hi" "HikeCollection" "Hikes" >}`

Nuevamente, en este momento me encuentro trabajando en una página que extraiga los campos de forma automática, esté pendiente de esta en {{< link "https://brewingcats.com/›" "Brewing Cats" >}}

Puedes ver las vizzes embebidas abajo

{{< tableau "viz1581401042962" "Sa" "SanDiego_15741313638760" "SanDiego" >}}

{{< caption "Viz de San Diego utiliza fotos localizadas Individualmente" >}}
{{< link "/es/posts/categories/travel/2019sandiego/" "Viaje a San Diego" >}}

{{< tableau "viz1595830498772" "Hi" "HikeCollection" "Hikes" >}}

{{< caption "Colección de Caminatas usando fotos agrupadas" >}}
{{< link "/es/posts/categories/travel/hikecollection/" "Colección de Caminatas" >}}

{{< head 1 "Conclusión" >}}

{{< big C >}}rear tu propio foto Viz no solo te permite mostrar tus fotos, también te permite compartirlas de una forma mas significativa. Puedes dar historias acerca de los lugares que 
aparecen en tu Viz, aquellos que estuvieron contigo en esos lugares se sentirán más relacionados con los eventos que tomaron lugar, y en general ofrecerás una experiencia más rica que solo 
mostrando tus fotos. Una vez que completes las piezas necesarias para hacer esto trabajar (las cuales puedes omitir y usar directamente 
{{< link "/posts/instagram/" "esta página para cargar fotos the Instagram" >}}) el resto sólo es Tableau y tus fotos

Embeber vizzes es un bono adicional porque mejora la funcionalidad de tu sitio proporcionando mejores experiencias para tus visitantes, muchas de esas experiencias añadidas solo se pueden obtener 
por medio de Tableau. Combinar vizzes con una buena historia y otras ayudas visuales harán de tu sitio un gran atractivo. Por ahora las vizzes que he creado se usan para mostrar información 
acerca de viajes y colecciones de fotos, sin embargo más opciones vendrán más adelante. Tener este tipo de vizzes también me ha permitido remover muchas fotos de mis páginas, haciéndola más 
ligera e interactiva (en lugar de poner todas las fotos al mismo tiempo). Usar Instagram me permitió tener contenido embebido que tiene buen desempeño y me ha dado formas adicionales de atraer 
tráfico a mi sitio web mediante el uso de mi perfil de Instagram y el uso de hashtags. Similarmente las vizzes publicadas me pueden ayudar a capturar tráfico hacia mi sitio web de modo que 
se gana en todos los sentidos, lo cual es perfecto para escritores y publicistas

Una observación sobre Tableau es que cuando los vizzes son embebidos la organización del contenido no se actualiza de forma automática, haciendo que la experiencia en pantallas pequeñas 
o de baja resolución no sea la mejor. Sin embargo una vez considerando todos los factores es genial tener la habilidad de usar Tableau en tu sitio web para mostrar tus fotos y en general 
enriquecer la web de una forma positiva. Seguiré buscando más casos para hacer uso de esta herramienta :smile:

{{< scrolltop >}}
{{< pageStats >}}
