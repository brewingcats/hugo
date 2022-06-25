---
title: "Telemetría"
date: 2021-02-13T17:29:42-08:00
draft: false
author: "Hugo Belin"
type: page
featured_image: '/images/site/telemetry.png'
categories: [site]
tags: [site]
description: Datos de Telemetría, estadistica de uso
lang: es
---

{{< big L >}}a mayoría si no es que todos los sitios web usan alguna forma de telemetría. Desde la 
creación de este sitio web he tenido planes de añadir telemetría. Muchos sitios sin embargo, 
recoleccionan datos no solo con el propósito de mejorar el sitio, detectar problemas de usabilidad, o con 
la finalidad de mejorarlo; muchos sitios venden esta información y la usan para otros 
propósitos. Dado que mi intención se limita a mejorar este sitio he tomado algunos pasos para asegurar 
que el manejo de la información es transparente

{{< big C >}}omo te habrás dado cuenta desarrollo la funcionalidad centra para este y otros sitios en una 
colección de librerías que llamo `Brewing Cats Core`. Otro sitio que hace uso de ellas 
es en {{< link "https://brewingcats.com/es/" "BrewingCats.com" >}} donde aplico los mismos principios 
para el uso de datos. Puedes ver nuestros terminos completos en cuanto al uso y generación 
de datos de Telemetría en la {{< link "https://brewingcats.com/es/posts/site/telemetry/" 
"página de Telemetría" >}} de {{< link "https://brewingcats.com/es/" "BrewingCats.com" >}}. Aquí 
simplificaré su contenido

{{< big C >}}onstruí un sistema de telemetría personalizado desde cero para tener el control del manejo 
de la información. Estoy haciendo los datos de telemetría generados disponibles a todos 
por medio de los diagramas mostrado abajo. No identifico a ninguna persona, solo se identifican sesiones 
de usuario, sin embargo tu te puedes identificar personalmente mediante el uso de 
tu `Client ID` mostrado abajo. Puedes ver la información que has generado al usar este sitio en algunos 
de los diagramas (los datos no son añadidos en tiempo real, si es la 
primera vez que visitas el sitio puede tomar hasta un mes en mostrarse, trataré de actualizar los datos 
frecuentemente). Finalmente si no deseas aportar con tus datos a la mejora de este sitio 
web puedes deshabilitar la generación de datos de telemetría de tu navegador usando el switch mostrado 
abajo

{{< head 4 "Datos de Telemetría del Último Mes" >}}
{{< telemetrybrs es >}}
Tu Client ID: {{< clientid >}}

{{< head 3 "Estadisticas del Mes" >}}
{{< grid >}}
  {{< gridcol "col" >}}
    {{< head 3 "Usuarios:" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< head 3 "Sesiones:" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< head 3 "Acceptaron TDS:" >}}
  {{</ gridcol >}}
{{</ grid>}}
{{< grid >}}
  {{< gridcol "col" >}}
    {{< telemetryMonthlyUsers name="monthly-users-count" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< telemetryMonthlySessions name="monthly-session-count" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< telemetryMonthlyTOS name="monthly-tos-count" >}}
  {{</ gridcol >}}
{{</ grid>}}

{{< grid >}}
  {{< gridcol "col" >}}
    {{< head 3 "Resoluciones Populares:" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< head 3 "Popularidad de Artículos:" >}}
  {{</ gridcol >}}
{{</ grid>}}
{{< grid >}}
  {{< gridcol "col" >}}
    {{< telemetryScreenSizes name="screen-sizes" >}}
  {{</ gridcol >}}
  {{< gridcol "col" >}}
    {{< telemetryPostScores name="post-scores" >}}
  {{</ gridcol >}}
{{</ grid>}}

Frescura de la Información: {{< telemetryFreshness name="telemetry-freshness" >}}

{{< head 4 "Usuarios Mensuales" >}}
{{< nivoUsageLine name="users-telemetry" prop="ClientId" filter="regular" >}}
{{< nivoUsageCalendar name="users-calendar" prop="ClientId" filter="regular" >}}

{{< head 4 "Sesiones Mensuales" >}}
{{< nivoUsageLine name="sessions-telemetry" prop="SessionId" filter="regular" >}}
{{< nivoUsageCalendar name="sessions-calendar" prop="SessionId" filter="regular" >}}

{{< head 4 "Mis Vistas por Día" >}}
{{< nivoUsageCalendar name="my-calendar" prop="SessionId" filter="currentUser" >}}

{{< head 4 "Zonas Horarias" >}}
{{< nivoTimeZones name="time-zones" >}}

{{< head 4 "Flujo entre Artículos" >}}
{{< nivoWorkflows name="page-flows" >}}

{{< head 4 "Popularidad de Tag_Id" >}}
{{< nivoUsageBar name="tag-id-count" >}}

{{< head 4 "Popularidad entre Artículos" >}}
{{< nivoPosts name="post-popularity" >}}

{{< break >}}

{{< scrolltop >}}
{{< pageStats >}}
