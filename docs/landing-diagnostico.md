# /diagnostico: la landing de la pauta

Página a la que llegan los anuncios. Tiene una sola oferta: el diagnóstico de 30 minutos con Valentino, gratis y sin precio. Junta la consulta con un formulario que califica y mide, por anuncio, qué pasa después del clic. Sirve para cualquier destino que se elija: formulario de Meta, landing o WhatsApp.

- `/diagnostico`: la landing. No se indexa (`noindex`) y no está en el sitemap.
- `/diagnostico/panel`: el panel con clave, con las consultas y los conteos.
- `/api/diagnostico`: guarda la consulta. `/api/diagnostico/evento`: cuenta los pasos. `/api/diagnostico/conteos`: los números para el juez.

## Variables de entorno (Vercel, server-side)

| Variable | Para qué | Si falta |
|---|---|---|
| `DATABASE_URL` | Base Neon donde quedan las consultas y los conteos. Se crea desde Vercel (Storage, Neon). Las tablas `diagnostico_*` se crean solas | El formulario avisa que no pudo guardar y no se cuenta nada |
| `DIAGNOSTICO_PANEL_CLAVE` | Clave del panel y de los conteos, de 12 caracteres o más | El panel pide configurarla |
| `DIAGNOSTICO_WHATSAPP` | Número de Nexora con código de país y solo dígitos (54 9, característica y número) | No aparece ningún botón de WhatsApp |
| `DIAGNOSTICO_EVOLUTION_URL` | Servidor de Evolution (v2) donde Lucas conectó por QR el número de Nexora. Solo `https://` | No avisa por WhatsApp; las consultas se ven en el panel |
| `DIAGNOSTICO_EVOLUTION_INSTANCIA` | Nombre de la conexión del número de Nexora en ese servidor. Nunca la de Raquel | Ídem |
| `DIAGNOSTICO_EVOLUTION_CLAVE` | La clave de esa conexión sola, no la general del servidor | Ídem |
| `DIAGNOSTICO_AVISO_A` | Quién recibe el aviso: 549, característica y número, solo dígitos | Ídem |
| `DIAGNOSTICO_AVISO_URL` | Opcional. Recibe cada consulta entera para avisarle a quien atiende. La conecta Lucas con el OK de Cogne: nunca al Portal ni a un flujo que le escriba solo a la persona | No manda nada a un webhook |

Van en Production y en Preview. Si las dos usan la misma base, cada fila guarda su entorno y el panel muestra solo producción salvo que se toque "Sumar vistas previas".

## El aviso por WhatsApp

Cada vez que entra una consulta, el número de Nexora le manda un WhatsApp a `DIAGNOSTICO_AVISO_A`. Le escribe solo a quien atiende, nunca a la persona que dejó la consulta.

- **Qué dice:** el código, el nombre, el negocio, cuándo lo quiere resolver ("Ahora" va en negrita), de qué anuncio vino, un link para escribirle y otro al panel. Lo que le come el tiempo queda solo en el panel.
- **Las de prueba:** las consultas de una vista previa llegan con `PRUEBA (preview)` adelante.
- **No demora a la persona:** el aviso sale después de responderle al formulario. Si falla, la consulta igual queda guardada y se ve en el panel.
- **El freno:** el número va por QR, que no es la vía oficial de Meta, así que se cuida. Si entran más de 10 consultas en una hora, manda un solo mensaje para mirar el panel y no avisa más hasta que baje el ritmo.
- **Para probarlo:** en el panel, "Mandarme uno de prueba". Si falla, el panel lo dice: lo más probable es que el número se haya desconectado y haya que volver a escanear el QR.

## El link de cada anuncio

Destino: `https://www.nexoragrowth.es/diagnostico`

En el campo "Parámetros de URL" del anuncio:

```
utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_term={{adset.name}}&utm_content={{ad.name}}
```

Meta reemplaza cada `{{…}}` por el nombre real. El nombre del anuncio sigue la convención de la Marketing Machine (`LAB01 A01 G03 | LP25 | …`). La página lee el código del ángulo (`A01`) y muestra su título, así el que llega lee lo mismo que vio. Los ángulos con título propio son A01, A02, A03, A04, A06, A09, A10, A12, A14 y A15 (`src/lib/diagnostico/textos.ts`). Los demás, o un anuncio sin código, muestran el título general.

Para lo orgánico, el mismo esquema a mano. Por ejemplo, la bio de Instagram: `?utm_source=instagram&utm_medium=bio`.

## Cómo se lee: creativo contra oferta

- **El creativo lo mide Meta:** el CTR del enlace y el costo por visita a la página de destino.
- **La oferta la mide la landing:** de las visitas, cuántas empiezan el formulario, cuántas lo mandan y cuántas dicen "Ahora".
- **Cómo cruzarlos:** si un anuncio trae visitas y nadie manda el formulario, mirá la página o la oferta. Si no trae visitas, mirá el creativo.
- **Calificado provisorio:** contó qué le come el tiempo (es obligatorio) y eligió "Ahora". El calificado de verdad, y las reuniones, propuestas y señas, los marca Cogne después de hablar.
- **Ojo con las visitas:** cuentan cargas de página, sin cookies. Si alguien recarga, suma dos.

| Paso | Qué cuenta | De dónde sale |
|---|---|---|
| Visitas | Cargas de la página con JavaScript (los robots y las vistas previas de Meta no suman) | Evento `visita` |
| Empezaron | Escribió o eligió el primer dato del formulario | Evento `inicio` |
| Lo mandaron | Consultas guardadas | Tabla de consultas |
| "Ahora" | Consultas que eligieron "Ahora" | Tabla de consultas |
| Próximos meses | Consultas que eligieron "En los próximos meses" | Tabla de consultas |
| WhatsApp | Clics en cualquier botón de WhatsApp | Evento `whatsapp` |

## Qué se guarda y qué no

- **Consulta:** lo que la persona escribe (negocio, equipo, qué le come el tiempo, urgencia, nombre y WhatsApp), los UTM, la fecha y el entorno. El formulario pide no poner datos de clientes ni de pacientes.
- **Evento:** el tipo, los UTM, el dominio del que vino (solo en la visita), la fecha y el entorno.
- **Lo que no se guarda:** cookies de visitantes, IP, navegador ni nada en el teléfono. La IP se usa solo en memoria, para frenar pedidos seguidos.
- **El panel:** usa una cookie propia, solo para quien entra con la clave.
- **El aviso:** pasa por WhatsApp el nombre, el número, el negocio, la urgencia y el origen de cada consulta. No guarda nada más.

## Para el juez de la Marketing Machine

```
GET /api/diagnostico/conteos?dias=7
Authorization: Bearer <DIAGNOSTICO_PANEL_CLAVE>
```

Devuelve, solo de producción y sin datos personales, una fila por origen. Cada fila trae `origen` (el nombre del anuncio), `angulo`, `visitas`, `inicios`, `envios`, `calificadas`, `proximos` y `whatsapp`.

## Antes de mandar tráfico

- [ ] `/privacidad` publicada: la arma el chat de la web y el formulario ya la linkea.
- [ ] `DATABASE_URL` y `DIAGNOSTICO_PANEL_CLAVE` cargadas en Vercel.
- [ ] Una consulta de prueba en la vista previa, vista en el panel con "Sumar vistas previas".
- [ ] `DIAGNOSTICO_WHATSAPP` con el número de Nexora.
- [ ] El número conectado por Lucas, las cuatro variables del aviso cargadas y "Mandarme uno de prueba" recibido.
- [ ] Los parámetros de URL cargados en cada anuncio.
- [ ] El destino de los anuncios, decidido por Cogne con Lucas.
