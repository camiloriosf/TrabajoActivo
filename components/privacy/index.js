/* eslint-disable jsx-a11y/anchor-is-valid, max-len */
// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Link from 'next/link';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
// component imports
import Header from '../index/header';
import Footer from '../index/footer';
// local imports
import { app } from '../../lib/google/firebase';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
  },
  content: {
    padding: 16,
    marginBottom: 100,
    margin: theme.spacing.unit * 3,
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  quote: {
    borderLeftWidth: 5,
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.primary[500],
    padding: 16,
    marginLeft: theme.spacing.unit * 3,
  },
  divider: {
    marginTop: theme.spacing.unit * 6,
  },
  title: {
    marginTop: theme.spacing.unit * 6,
  },
});

class Privacy extends Component {
  state = {
    loggedIn: false,
  }
  componentDidMount = () => {
    this.mounted = true;
    app.auth().onAuthStateChanged((user) => {
      if (user && this.mounted) this.setState({ loggedIn: true });
    });
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    if (
      this.state.loggedIn !== nextState.loggedIn
    ) return true;
    return false;
  }
  componentWillUnmount = () => {
    this.mounted = false;
  }
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <Header loggedIn={this.state.loggedIn} absolute={false} />
        <div className={classes.content}>
          <Typography type="display3" paragraph>
            Política de privacidad
          </Typography>
          <Typography type="display1" paragraph className={classes.title}>
            Tu privacidad es importante para nosotros.
          </Typography>
          <Typography type="subheading" paragraph>
            El objetivo de LinkedIn es conectar a los profesionales de todo el mundo para ayudarles a ser más productivos y a alcanzar sus metas laborales. Clave para esta misión es nuestro compromiso a ser transparentes contigo sobre los datos que recabamos sobre ti y el modo en que se utilizan y comparten.
            <br /><br />
            Al utilizar nuestros Servicios, aceptas que usemos tus datos conforme a lo establecido en esta Política de privacidad.
          </Typography>
          <Divider className={classes.divider} />
          <section id="introduccion">
            <Typography type="display1" paragraph className={classes.title}>
              1. Introducción
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Somos una red social y una plataforma en línea para profesionales. La gente utiliza nuestros Servicios para encontrar oportunidades laborales o para que ellas les encuentren, así como para conectarse con otras personas y tener acceso a información. Nuestra Política de privacidad se aplica a cualquier Miembro o Visitante de los Servicios cubiertos.
            </Typography>
            <Typography type="body1" paragraph>
              Nuestros usuarios registrados («Miembros») comparten su identidad profesional, interactúan con su red de contactos, intercambian información y conocimientos profesionales, publican y ven contenido relevante, se informan y encuentran oportunidades profesionales y de negocio. Parte del contenido de algunos de nuestros Servicios está disponible para personas que no son miembros («Visitantes»).
            </Typography>
            <Typography type="body2">
              Responsables del tratamiento de datos
            </Typography>
            <Typography type="body1" paragraph>
              Si resides en Estados Unidos, estás suscribiendo las Condiciones de uso con LinkedIn Corporation, que será responsable de tus datos personales proporcionados a o recopilados por nuestros Servicios. Si resides fuera de Estados Unidos, estás suscribiendo las <Link href="/terms"><a>Condiciones de uso</a></Link> con LinkedIn Ireland U.C., que será responsable de tus datos personales proporcionados a o recopilados por nuestros Servicios.
            </Typography>
            <Typography type="body2">
              Servicios
            </Typography>
            <Typography type="body1" paragraph>
              Esta Política de privacidad se aplica a LinkedIn.com, a las aplicaciones de la marca LinkedIn, a Slideshare, a LinkedIn Learning y a otros sitios relacionados con LinkedIn, a las aplicaciones, comunicaciones y servicios («Servicios»), incluidos los Servicios ofrecidos fuera del sitio web, como nuestros servicios de publicidad y los complementos «Solicitar con LinkedIn» y «Compartir en LinkedIn», pero quedan excluidos los servicios que se ofrecen en virtud de una política de privacidad diferente.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Si utilizas nuestros Servicios, aceptas esta Política de privacidad, incluida nuestra Política de cookies.
            </Typography>
            <Typography type="body2">
              Consentimiento
            </Typography>
            <Typography type="body1" paragraph>
              Si utilizas nuestros Servicios, aceptas que se recopilen, usen y compartan tus datos personales en virtud de esta Política de privacidad (que incluye nuestra Política de cookies y otros documentos a los que se haga referencia en la Política de privacidad) y aceptas las Condiciones de uso. Te proporcionamos opciones que te permiten autoexcluirte o controlar cómo utilizamos y compartimos tus datos.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Si usas los Servicios después de una actualización de esta Política de privacidad, estarás aceptando la Política modificada.
            </Typography>
            <Typography type="body2">
              Cambios
            </Typography>
            <Typography type="body1" paragraph>
              Podemos modificar esta Política de privacidad y si introducimos algún cambio importante te avisaremos a través de nuestros Servicios, o por otros medios, para ofrecerte la oportunidad de revisar los cambios antes de que se hagan efectivos. Si no estás de acuerdo con cualquiera de los cambios, puedes <Link href="/settings"><a>cerrar tu cuenta</a></Link>. Tu uso continuado de nuestros Servicios después de publicar o de enviar un aviso sobre los cambios a esta Política de privacidad significará que estás de acuerdo con los términos actualizados.
            </Typography>
          </section>
          <section id="informacion">
            <Typography type="display1" paragraph className={classes.title}>
              2. Información que recopilamos
            </Typography>
            <Typography type="title" paragraph>
              2.1 Información que nos proporcionas
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Nos proporcionas datos para crear una cuenta en LinkedIn.
            </Typography>
            <Typography type="body2">
              Registro
            </Typography>
            <Typography type="body1" paragraph>
              Para crear una cuenta, debes proporcionarnos datos como tu nombre, tu dirección de correo electrónico o número de móvil, y una contraseña. Si te registras en un Servicio Premium, te pediremos tu información de pago y de facturación (por ejemplo, tu tarjeta de crédito).
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Creas un perfil en LinkedIn (un perfil completo te ayuda a sacar el máximo provecho de nuestros Servicios).
            </Typography>
            <Typography type="body2">
              Perfil
            </Typography>
            <Typography type="body1" paragraph>
              En tu perfil tienes diferentes opciones que puedes incluir como la educación, la experiencia laboral, las aptitudes, una fotografía, tu ciudad o ubicación y las validaciones. Algunos profesionales pueden escoger completar un perfil independiente de ProFinder. La información del perfil te ayuda a sacar mayor provecho de nuestros Servicios, como ayudar a que te encuentren los técnicos de selección y a encontrar oportunidades de negocio. Tú decides si deseas incluir información delicada en tu perfil. No publiques o añadas datos personales que no quieras que se hagan públicos.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Nos proporcionas otros datos al sincronizar tu agenda de direcciones o tu calendario.
            </Typography>
            <Typography type="body2">
              Publicación y carga de contenidos
            </Typography>
            <Typography type="body1" paragraph>
              Recopilamos datos personales tuyos cuando nos los proporcionas, publicas o cargas en nuestros Servicios, como cuando rellenas un formulario, respondes a una encuesta (por ejemplo, sobre el sueldo de los Miembros), envías un currículum y solicitas o guardas empleos o envías invitaciones. Si decides importar tu agenda de direcciones, recibiremos tus contactos (incluida la información de contacto que tu(s) proveedor(es) de servicios o aplicaciones hayan añadido automáticamente a tu agenda de direcciones cuando te hayas comunicado con direcciones o números que no estén todavía en tu lista). Si sincronizas tu correo electrónico o tus calendarios con nuestros Servicios, recabaremos el encabezado del correo electrónico y la información de las reuniones del calendario (por ejemplo, horarios, lugares, asistentes y contactos).
            </Typography>
            <Typography type="title" paragraph>
              2.2 Información de otras personas
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Puede que otras personas publiquen contenidos o escriban sobre ti.
            </Typography>
            <Typography type="body2">
              Contenido y noticias
            </Typography>
            <Typography type="body1" paragraph>
              Tú y otras personas podéis publicar contenido que incluya información sobre ti en nuestros Servicios (como parte de las publicaciones en blogs, actualizaciones y comentarios en el feed, vídeos). A menos que marques la opción de autoexclusión, recabamos información pública sobre ti, como noticias y logros profesionales (por ejemplo, concesión de patentes, reconocimiento profesional, ponencias en conferencias, proyectos, etc.) y la publicamos como parte de nuestros Servicios (por ejemplo, sugerencias para tu perfil o notificaciones de menciones en las noticias).
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Otras personas pueden sincronizar sus contactos o calendario con nuestros Servicios.
            </Typography>
            <Typography type="body2">
              Información de contacto y del calendario
            </Typography>
            <Typography type="body1" paragraph>
              Recibimos datos personales tuyos cuando otras personas importan o sincronizan su agenda de direcciones o calendario con nuestros Servicios, o envían mensajes utilizando nuestros Servicios (incluidas las invitaciones o solicitudes de contacto).
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Nuestros clientes y socios pueden proporcionarnos datos.
            </Typography>
            <Typography type="body2">
              Socios
            </Typography>
            <Typography type="body1" paragraph>
              Recibimos datos personales tuyos cuando utilizas los servicios de nuestros clientes y socios, como empleadores potenciales y los sistemas de seguimiento de solicitantes que nos transmiten información sobre las solicitudes de empleo.
            </Typography>
            <Typography type="title" paragraph>
              2.3 Uso de los Servicios
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Registramos tus visitas y tu uso de nuestros Servicios, incluidas las aplicaciones móviles.
            </Typography>
            <Typography type="body1" paragraph>
              Registramos los datos de uso cuando visitas o utilizas de otro modo nuestros Servicios, incluidos nuestros sitios web, las aplicaciones y la tecnología de la plataforma (por ejemplo, nuestros complementos en otros sitios web), como cuando ves o haces clic en un contenido (por ejemplo, un vídeo de aprendizaje) o en anuncios (en nuestros sitios web y aplicaciones o fuera de ellos), realizas una búsqueda, instalas una de nuestras aplicaciones móviles, compartes artículos o solicitas empleos. Utilizamos registros de inicio de sesión, información de dispositivos y direcciones de protocolo de Internet («IP») para identificarte y registrar tu uso en LinkedIn.
            </Typography>
            <Typography type="title" paragraph>
              2.4 Cookies, balizas web y otras tecnologías similares.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Recopilamos datos a través de cookies y de tecnologías similares.
            </Typography>
            <Typography type="body1" paragraph>
              Como se describe en nuestra Política de cookies, utilizamos cookies y tecnologías similares (por ejemplo, balizas web, píxeles, etiquetas de anuncios e identificadores de dispositivos) para reconocerte a ti y/o a tu(s) dispositivo(s) en los diferentes Servicios y dispositivos. También permitimos que otras personas usen cookies en el modo descrito en nuestra Política de cookies. Puedes controlar las cookies a través de la configuración de tu navegador y de otras herramientas. También puedes marcar la opción de autoexclusión para que no utilicemos cookies ni tecnologías similares que hacen un seguimiento de tu comportamiento en otros sitios web para la publicidad de terceros. Los Visitantes pueden autoexcluirse aquí.
            </Typography>
            <Typography type="title" paragraph>
              2.5 Tu dispositivo y tu ubicación.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Recibimos datos de tus dispositivos y redes, incluidos los datos de ubicación.
            </Typography>
            <Typography type="body1" paragraph>
              Cuando visitas o abandonas nuestros Servicios (incluidos nuestros complementos, cookies o tecnologías similares en otros sitios web), recibimos la URL del sitio de dónde has llegado y del sitio al que te diriges después. También recibimos información sobre tu dirección IP, servidor proxy, sistema operativo, navegador web y complementos, el identificador y las funciones de tu dispositivo móvil o de tu operador de red móvil. Si utilizas nuestros Servicios desde un dispositivo móvil, ese dispositivo nos enviará los datos de tu ubicación. La mayoría de dispositivos permiten impedir el envío de datos de ubicación y respetaremos tu configuración.
            </Typography>
            <Typography type="title" paragraph>
              2.6 Mensajes
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Si te comunicas a través de nuestros Servicios, recibiremos esa información.
            </Typography>
            <Typography type="body1" paragraph>
              Recabamos información sobre ti cuando envías, recibes o interactúas con mensajes relacionados con nuestros Servicios. Por ejemplo, si recibes una solicitud de contacto en LinkedIn, realizamos un seguimiento para ver si has realizado alguna acción al respecto y te mandaremos recordatorios. También utilizamos tecnología de escaneo automático en los mensajes.
            </Typography>
            <Typography type="title" paragraph>
              2.7 Información proporcionada por la empresa
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Cuando tu empresa adquiere un Servicio Premium para que lo uses en el trabajo, podrían proporcionarnos datos sobre ti.
            </Typography>
            <Typography type="body1" paragraph>
              Una empresa (u otra persona o entidad que obtiene nuestros Servicios para tu uso) puede proporcionarnos información sobre sus empleados o contratistas que utilizan los Servicios. Por ejemplo, obtendremos información de contacto de los administradores de las «Páginas de empresa» y de los usuarios con autorización para utilizar nuestros Servicios Premium, como nuestros productos de contratación, de ventas o de aprendizaje.
            </Typography>
            <Typography type="title" paragraph>
              2.8 Sitios y servicios de terceros.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Obtenemos datos cuando visitas sitios que incluyen nuestros complementos, anuncios, cookies o cuando inicias sesión en los servicios de otras personas a través de tu cuenta de LinkedIn.
            </Typography>
            <Typography type="body1" paragraph>
              Recibimos información sobre tus visitas e interacción con los servicios proporcionados por otras personas cuando inicias sesión con LinkedIn o visitas servicios de otras personas que incluyen nuestros complementos (como «Compartir en LinkedIn» o «Solicitar con LinkedIn»), anuncios, cookies o tecnologías similares.
            </Typography>
            <Typography type="title" paragraph>
              2.9 Otra información.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Estamos mejorando nuestros Servicios, lo que significa que recibimos nuevos datos y creamos nuevos modos de utilizar los datos.
            </Typography>
            <Typography type="body1" paragraph>
              Nuestros Servicios son dinámicos y con frecuencia introducimos nuevas funciones, que pueden requerir la recopilación de nueva información. Si recabamos datos personales muy diferentes o si cambiamos en gran medida el modo en que usamos tus datos, te lo notificaremos y también podríamos modificar esta Política de privacidad.
            </Typography>
          </section>
          <section id="datos">
            <Typography type="display1" paragraph className={classes.title}>
              3. Cómo utilizamos tus datos
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Utilizamos tus datos para proporcionar, apoyar, personalizar y desarrollar nuestros Servicios.
            </Typography>
            <Typography type="body1" paragraph>
              El modo en que utilizamos tus datos personales dependerá de los Servicios que utilices, de la forma en que uses esos Servicios y de tu configuración. Utilizamos los datos que tenemos sobre ti para proporcionar, apoyar, personalizar y hacer que nuestros Servicios (incluidos los anuncios) sean más relevantes y útiles para ti y los demás.
            </Typography>
            <Typography type="title" paragraph>
              3.1 Servicios
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Nuestros Servicios te ayudan a conectar con otras personas, encontrar empleos y oportunidades de negocio o dejar que ellos te encuentren, mantenerte informado, formarte y ser más productivo.
            </Typography>
            <Typography type="body1" paragraph>
              Utilizamos tus datos para autenticarte y autorizarte el acceso a nuestros Servicios.
            </Typography>
            <Typography type="body2">
              Mantente conectado
            </Typography>
            <Typography type="body1" paragraph>
              Nuestros Servicios te permiten mantenerte al día, en comunicación y en contacto con tus colegas, socios, clientes y otros contactos profesionales. Para hacerlo, te «conectarás» con los profesionales que escojas y también que deseen «conectar» contigo. Cuando conectéis, podréis buscar vuestros contactos para intercambiar oportunidades profesionales.
            </Typography>
            <Typography type="body1" paragraph>
              Utilizaremos tus datos (como los perfiles que has visto o los datos proporcionados a través de la carga de tu agenda de direcciones o integraciones de socios) para sugerirte contactos a ti y a otras personas (por ejemplo, Miembros que tienen contactos en común contigo) y ofrecerte la posibilidad de invitar a otras personas a que se hagan Miembros y conecten contigo. También puedes permitirnos utilizar tu ubicación precisa o aproximada para sugerirte otros Miembros que se encuentran cerca ti para que te conectes con ellos. Tú decides si deseas invitar a alguien a participar en nuestros Servicios, si envías una solicitud de contacto o si permites que otro Miembro se convierta en contacto tuyo. Cuando invites a alguien a conectarse contigo, tu invitación incluirá tu nombre, foto, red e información de contacto. Enviaremos recordatorios a la persona que hayas invitado. Puedes escoger si quieres compartir tu propia lista de contactos con tus contactos.
            </Typography>
            <Typography type="body1" paragraph>
              Los Visitantes tienen la opción de escoger el modo en que utilizamos sus datos.
            </Typography>
            <Typography type="body2">
              Mantente informado
            </Typography>
            <Typography type="body1" paragraph>
              Nuestros Servicios te permiten mantenerte informado acerca de noticias, eventos e ideas sobre los asuntos profesionales que te interesan y de los profesionales que admiras. Nuestros Servicios también te permiten mejorar tus aptitudes profesionales o aprender otras nuevas. Utilizamos la información que tenemos sobre ti para recomendarte contenido relevante en nuestros Servicios, sugerirte aptitudes que puedas tener para que las añadas a tu perfil así como aptitudes que quizá necesites para encontrar tu próxima oportunidad laboral. Así que, si nos comunicas que estás interesado en una nueva aptitud (por ejemplo, al ver un vídeo de aprendizaje), utilizaremos dicha información para personalizar el contenido de tu feed, sugerirte que sigas a determinados miembros en nuestro sitio o para recomendarte contenido de aprendizaje relacionado a fin de ayudarte a aprender esa nueva aptitud. Utilizamos tu contenido, tu actividad y tus datos, incluidos tu nombre y tu foto, para enviar notificaciones a tu red y a otras personas. Por ejemplo, en función de tu configuración, podemos notificar a otras personas que has actualizado tu perfil, publicado un blog, realizado una acción social, que tienes un nuevo contacto o que has sido mencionado en las noticias.
            </Typography>
            <Typography type="body2">
              Empleos
            </Typography>
            <Typography type="body1" paragraph>
              Nuestros Servicios te permiten encontrar empleos, evaluar oportunidades de formación y buscar oportunidades laborales y permitir que ellas te encuentren. Tanto las personas que están buscando candidatos (para un empleo o tarea específica) como aquellas que quieren que las contrates pueden encontrar tu perfil. Utilizaremos tus datos para recomendarte empleos, mostrarte a ti y a otras personas quién trabaja en una empresa, en un sector, en una función o ubicación, o quién tiene determinadas aptitudes y contactos. Puedes indicar que estás interesado en cambiar de empleo y compartir información con los técnicos de selección de personal. Podemos utilizar tu perfil y actividad para recomendarte empleos y recomendarte a los técnicos de selección.
            </Typography>
            <Typography type="body2">
              Productividad
            </Typography>
            <Typography type="body1" paragraph>
              Nuestros Servicios te permiten colaborar con colegas, buscar clientes potenciales, clientes, socios y a otras personas con las que hacer negocios. Nuestros Servicios te permiten comunicarte con otros profesionales y programar y preparar reuniones con ellos. En función de tu configuración, escaneamos los mensajes para proporcionar «bots» o herramientas similares que facilitan tareas como programar reuniones, redactar respuestas, resumir mensajes o recomendar los siguientes pasos a adoptar.
            </Typography>
            <Typography type="title" paragraph>
              3.2 Servicios Premium
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Nuestros Servicios Premium permiten a los usuarios de pago buscar y contactar con Miembros a través de nuestros Servicios (como candidatos para un empleo, posibles clientes y compañeros de trabajo), para gestionar candidatos y para promover contenido a través de las redes sociales.
            </Typography>
            <Typography type="body1" paragraph>
              Como parte de nuestras soluciones de selección de candidatos, marketing y ventas, vendemos Servicios Premium que proporcionan a nuestros clientes funcionalidades y herramientas de búsqueda personalizadas (como mensajes y alertas de actividad). Estos suscriptores pueden exportar información limitada de tu perfil como el nombre, titular, empresa actual, cargo actual y la ubicación general (por ejemplo, Dublín) a fin de gestionar los posibles clientes de ventas o candidatos, salvo que marques la opción de autoexclusión. No proporcionamos información de contacto a estos suscriptores como parte de estos Servicios Premium sin tu consentimiento. Un suscriptor de Servicios Premium puede almacenar la información que tenga sobre ti en nuestros Servicios Premium, como el currículum vítae, la información de contacto o el historial de ventas. Los datos proporcionados sobre ti por estos suscriptores dependerán de las políticas de esos suscriptores. Otros Servicios de empresa que utilizan tus datos son LinkedIn Referrals (recomendaciones de empleo), Lookup (directorio de empresas) y Elevate (promoción social de contenido). Más información.
            </Typography>
            <Typography type="title" paragraph>
              3.3 Comunicaciones
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Te contactamos y permitimos las comunicaciones entre Miembros. Ofrecemos una configuración que te permite controlar qué y con qué frecuencia recibes algunos tipos de mensajes.
            </Typography>
            <Typography type="body1" paragraph>
              Contactaremos contigo por correo electrónico, a través de avisos publicados en los sitios web o aplicaciones de LinkedIn, mensajes en tu buzón de LinkedIn y a través de otros medios disponibles en nuestros Servicios, incluidos los mensajes de texto y las notificaciones automáticas. Te enviaremos mensajes sobre la disponibilidad de nuestros Servicios, la seguridad u otras cuestiones relacionadas con los servicios prestados. Te mandaremos también mensajes sobre cómo usar los Servicios, actualizaciones de red, recordatorios, sugerencias de empleo y mensajes promocionales nuestros y de nuestros socios. Puedes cambiar tus preferencias de comunicación en cualquier momento. Ten en cuenta que no puedes autoexcluirte de nuestros mensajes de servicio, incluidos avisos de seguridad y de naturaleza jurídica.
            </Typography>
            <Typography type="body1" paragraph>
              También posibilitamos las comunicaciones entre tú y otras personas a través de nuestros Servicios, incluidas, por ejemplo, las invitaciones, los mensajes InMail, los grupos y los mensajes entre contactos.
            </Typography>
            <Typography type="title" paragraph>
              3.4 Publicidad
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Te ofrecemos anuncios personalizados dentro y fuera de los Servicios. Te damos la opción de autoexcluirte de los anuncios segmentados a partir de tus intereses, pero no puedes autoexcluirte de los anuncios genéricos.
            </Typography>
            <Typography type="body1" paragraph>
              Mostramos anuncios (y medimos su rendimiento) a Miembros, Visitantes y a otras personas dentro y fuera de nuestros Servicios a través de una variedad de redes de anuncios e intercambios, utilizando los siguientes datos, de manera independiente o combinada:
            </Typography>
            <Typography type="body1" paragraph>
              • Datos de tecnologías de publicidad dentro y fuera de nuestros Servicios, como balizas web, píxeles, etiquetas de anuncios, cookies e identificadores de dispositivos.
            </Typography>
            <Typography type="body1" paragraph>
              • Información proporcionada por los Miembros (por ejemplo, información de contacto, cargo y sector).
            </Typography>
            <Typography type="body1" paragraph>
              • Datos sobre tu uso de nuestros Servicios (por ejemplo, el historial de búsqueda, el feed, el contenido que lees, a quién estás siguiendo o te está siguiendo, los contactos, la participación en grupos, las visitas a páginas, los vídeos que ves, los clics en un anuncio, etc.), incluido lo que se describe en la sección 1.3.
            </Typography>
            <Typography type="body1" paragraph>
              • Información de otras personas (por ejemplo, los socios de publicidad, editores y agregadores de datos).
            </Typography>
            <Typography type="body1" paragraph>
              • La información inferida de los datos descritos anteriormente (por ejemplo, utilizar los cargos de empleo para inferir la edad, el sector, la antigüedad y la escala de compensación; o nombres para inferir el sexo).
            </Typography>
            <Typography type="body1" paragraph>
              Te mostraremos anuncios denominados Contenido patrocinado y que se asemejan a los anuncios de contenido no patrocinado, con la diferencia de que se trata de anuncios patrocinados. Si realizas alguna acción (como recomendar, comentar o compartir) relacionada con estos anuncios, tu acción se asociará a tu nombre y será visible para otras personas, incluido el anunciante.
            </Typography>
            <Typography type="body2">
              Opciones de publicidad
            </Typography>
            <Typography type="body1" paragraph>
              Cumplimos con los principios de autorregulación para publicidad basada en intereses y participamos de la opción de autoexclusión del sector para dicha publicidad. Pero no por ello dejarás de recibir publicidad: continuarás viendo anuncios genéricos o anuncios de anunciantes no enumerados en estas herramientas de autorregulación. También puedes autoexcluirte de la publicidad basada en tus intereses que terceros anuncian en nuestra plataforma. Esta configuración está disponible aquí para las personas que no son Miembros.
            </Typography>
            <Typography type="body2">
              Información para los anunciantes
            </Typography>
            <Typography type="body1" paragraph>
              No compartiremos tus datos personales con ningún anunciante (aparte de los identificadores de dispositivos o etiquetas, en la medida en que no se consideren datos personales en algunos países) ni con redes de anuncios para publicidad sin tu permiso explícito. No obstante, si haces clic en un anuncio, el anunciante sabrá que has visitado la página en la que has hecho clic. Además, nuestros socios publicitarios pueden asociar datos personales recopilados por el anunciante directamente de ti con nuestras cookies y tecnologías similares. En esos casos, exigimos contractualmente que esos anunciantes obtengan tu consentimiento explícito antes de hacerlo.
            </Typography>
            <Typography type="title" paragraph>
              3.5 Marketing
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Promovemos nuestros Servicios ante ti y otras personas.
            </Typography>
            <Typography type="body1" paragraph>
              Utilizamos datos y contenido sobre los Miembros para invitaciones y comunicaciones que promuevan que haya un mayor número de miembros y el crecimiento de la red, la participación y nuestros Servicios.
            </Typography>
            <Typography type="title" paragraph>
              3.6 Desarrollo de los Servicios e Investigación
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Desarrollamos nuestros Servicios y realizamos investigaciones.
            </Typography>
            <Typography type="body2">
              Desarrollo del Servicio
            </Typography>
            <Typography type="body1" paragraph>
              Usamos datos, incluidos los comentarios públicos, para realizar investigaciones y desarrollar nuestros Servicios a fin de proporcionarte a ti y a otros Miembros una experiencia más personalizada e intuitiva, aumentar el número de Miembros y la interacción en nuestros Servicios y ayudar a que los profesionales se conecten entre sí y tengan acceso a oportunidades económicas.
            </Typography>
            <Typography type="body2">
              Otras investigaciones
            </Typography>
            <Typography type="body1" paragraph>
              Buscamos crear oportunidades económicas para trabajadores de todo el mundo y ayudarles a ser más productivos y a alcanzar sus metas laborales. Utilizamos los datos de que disponemos para investigar tendencias sociales, económicas y corporativas como la disponibilidad de empleos y de las aptitudes necesarias para ejercer dichos empleos, así como las políticas que contribuyen a tender puentes entre los distintos sectores y zonas geográficas. En algunos casos, trabajamos con terceras partes de confianza para llevar a cabo esta investigación, con controles diseñados para proteger tu privacidad. Publicamos o permitimos que otras personas publiquen información económica, presentada como datos agregados en lugar de como datos personales.
            </Typography>
            <Typography type="body2">
              Encuestas
            </Typography>
            <Typography type="body1" paragraph>
              Nosotros o terceros llevamos a cabo los sondeos y encuestas que realizamos a través de nuestros Servicios. No estás obligado a responder a los sondeos o encuestas y dispones de diferentes opciones sobre la información que proporcionas. Puedes marcar la opción de autoexclusión para no recibir invitaciones de encuestas.
            </Typography>
            <Typography type="title" paragraph>
              3.7 Atención al cliente
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Utilizamos los datos para ayudarte y solucionar problemas.
            </Typography>
            <Typography type="body1" paragraph>
              Usamos los datos (que pueden incluir tus comunicaciones) necesarios para investigar, responder y resolver quejas y problemas con el Servicio (por ejemplo, errores).
            </Typography>
            <Typography type="title" paragraph>
              3.8 Información agregada.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Utilizamos los datos para generar información agregada.
            </Typography>
            <Typography type="body1" paragraph>
              Usamos tu información para generar datos agregados que no te identifiquen. Por ejemplo, podemos usar tus datos para generar estadísticas sobre nuestros usuarios, su profesión o sector, el número de impresiones o de clics en un anuncio, o la distribución demográfica de los visitantes de un sitio web.
            </Typography>
            <Typography type="title" paragraph>
              3.9 Seguridad e investigaciones.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Utilizamos los datos por motivos de seguridad, prevención de casos de fraude e investigaciones.
            </Typography>
            <Typography type="body1" paragraph>
              Usamos tus datos (incluidas tus comunicaciones) si pensamos que es necesario por motivos de seguridad o para investigar posibles fraudes u otras violaciones de nuestras Condiciones de uso o de esta Política de privacidad, y/o intentos de dañar a nuestros Miembros o Visitantes.
            </Typography>
          </section>
          <section id="compartir">
            <Typography type="display1" paragraph className={classes.title}>
              4. Cómo compartimos la información
            </Typography>
            <Typography type="title" paragraph>
              4.1 Nuestros Servicios
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Cualquier información que incluyas en tu perfil y cualquier contenido que publiques o acción social (por ejemplo, recomendaciones, contenido seguido, comentarios o contenido compartido) que realices en nuestros Servicios serán vistos por otras personas.
            </Typography>
            <Typography type="body2">
              Perfil
            </Typography>
            <Typography type="body1" paragraph>
              Tu perfil es visible para todos los Miembros y clientes de nuestros Servicios. Como se detalla en nuestro Centro de ayuda, tu configuración, tu grado de contacto con el Miembro que ve tu perfil, las suscripciones que pueda tener, su uso de nuestros Servicios, los canales de acceso y los tipos de búsqueda (por ejemplo, por nombre o palabra clave) influyen en la disponibilidad de tu perfil y de determinados campos.
            </Typography>
            <Typography type="body2">
              Publicaciones, recomendaciones, contenido seguido, comentarios, mensajes
            </Typography>
            <Typography type="body1" paragraph>
              Nuestros Servicios permiten que se vea y se comparta información, incluso a través de publicaciones, contenido seguido, recomendaciones y comentarios.
            </Typography>
            <Typography type="body1" paragraph>
              • Cuando compartes una publicación (por ejemplo, una actualización, vídeo o blog), la configuración por defecto (que puedes cambiar) es que se comparta públicamente. Otros usuarios que no son tus contactos podrán encontrarte (incluso a través de motores de búsqueda) y ver tus publicaciones.
            </Typography>
            <Typography type="body1" paragraph>
              • Cuando recomiendas, comentas o compartes la publicación de otra persona, otros usuarios podrán verla, incluida la persona que inició la publicación.
            </Typography>
            <Typography type="body1" paragraph>
              • En un grupo, las publicaciones son visibles para los demás miembros del grupo. Tu pertenencia a un grupo es pública y también lo es parte de tu perfil, salvo que cambies la configuración por defecto.
            </Typography>
            <Typography type="body1" paragraph>
              • Cualquier información que compartas a través de las páginas de empresa o de otras organizaciones en nuestros Servicios podrá ser vista por otras personas que visiten esas páginas.
            </Typography>
            <Typography type="body1" paragraph>
              • Cuando sigas a una persona u organización, podrás ser visto por otras personas y por el «propietario de la página» como seguidor. Proporcionamos información agregada sobre los seguidores y usuarios a los propietarios de las página.
            </Typography>
            <Typography type="body1" paragraph>
              • Permitimos a los remitentes saber cuándo actúas en relación con su mensaje, en función de tu configuración cuando aplique.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Tu empresa puede ver cómo utilizas los Servicios que te han proporcionado para ayudarte en tu profesión (por ejemplo, como técnico de selección de personal o representante de ventas) y la información relacionada. No mostraremos tus búsquedas de empleo ni tus mensajes personales.
            </Typography>
            <Typography type="body2">
              Cuentas de empresa
            </Typography>
            <Typography type="body1" paragraph>
              Puede que tu empresa te ofrezca acceder a nuestros Servicios de empresa como Recruiter, Sales Navigator, Elevate, Referrals, Lookup o nuestro Administrador de campañas publicitarias. También pueden adquirir tu acceso a nuestros productos de aprendizaje en línea. Tu empresa puede revisar y gestionar tu uso de esos Servicios de empresa.
            </Typography>
            <Typography type="body1" paragraph>
              En función del Servicio de empresa, y antes de que utilices dicho Servicio, te pediremos permiso para compartir datos relevantes de tu perfil o tu uso de nuestros Servicios que no son para empresas. Por ejemplo, a los usuarios de Sales Navigator se les pedirá que compartan su índice de ventas con redes sociales, un baremo calculado en parte con base en la actividad de su cuenta personal. Comprendemos que determinadas actividades como los mensajes personales y aquellas relacionadas con la búsqueda de empleo son sensibles y, por tanto, no compartiremos esa información con tu empresa, salvo que escojas compartirla a través de nuestros Servicios (por ejemplo, solicitando un nuevo puesto en la misma empresa o si mencionas que estás buscando trabajo en un mensaje a un compañero de trabajo a través de nuestros Servicios).
            </Typography>
            <Typography type="title" paragraph>
              4.2 Archivo de las comunicaciones
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              A aquellos Miembros que trabajan en un entorno regulado puede que se les exija almacenar las comunicaciones fuera de nuestro Servicio.
            </Typography>
            <Typography type="body1" paragraph>
              Algunos Miembros (o sus empleados) deben, por razones legales o de cumplimiento profesional, archivar sus comunicaciones y actividad en las redes sociales, y utilizarán servicios de terceros para estos servicios de archivo. Nosotros permitimos dicha actividad de archivo fuera de nuestros Servicios. Por ejemplo, un asesor financiero debe archivar las comunicaciones con su cliente a través de nuestros Servicios para mantener su licencia de asesor financiero profesional.
            </Typography>
            <Typography type="title" paragraph>
              4.3 Servicios de terceros
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Puedes vincular tu cuenta con los servicios de terceros para que puedan buscar los perfiles de tus contactos o publicar tu contenido compartido en esas plataformas.
              <br /><br />
              En función de tus preferencias, otros servicios pueden buscar tu perfil.
            </Typography>
            <Typography type="body1" paragraph>
              Cuando decides vincular tu cuenta con otros servicios, tus datos personales estarán disponibles para los mismos. Se describirá, o se asociará, en una pantalla de consentimiento qué se entiende por compartir y utilizar esos datos personales cuando vincules las cuentas. Por ejemplo, puedes asociar tus cuentas de Twitter o WeChat para compartir contenido de nuestros Servicios en esos otros servicios, o tu proveedor de correo electrónico puede darte la opción de cargar tus contactos de LinkedIn en su propio servicio. Puedes revocar la vinculación de esas cuentas.
            </Typography>
            <Typography type="body1" paragraph>
              En función de tu configuración, aparecerán extractos de tu perfil en los servicios de terceros (por ejemplo, en los resultados de motores de búsqueda, aplicaciones de correo electrónico y de calendario que muestran a un usuario un miniperfil de LinkedIn de la persona con la que va a reunirse o mensajes, agregadores de redes sociales, o administradores de candidatos o de posibles clientes). La información de perfil «antigua» permanecerá en estos servicios hasta que estos servicios actualicen su caché de datos con los cambios que hayas realizado en tu perfil.
            </Typography>
            <Typography type="title" paragraph>
              4.4 Servicios relacionados
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Compartimos tus datos entre nuestros Servicios y con las entidades afiliadas a LinkedIn.
            </Typography>
            <Typography type="body1" paragraph>
              Compartiremos tus datos personales con nuestras filiales para proporcionar o desarrollar nuestros Servicios. Combinamos la información internamente entre los diferentes Servicios cubiertos por esta Política de privacidad. Por ejemplo, SlideShare te recomendará mejores contenidos basándose en tu perfil de LinkedIn o en los artículos que lees en Pulse, y LinkedIn podría personalizar tu feed o tus recomendaciones de empleo basándose en tu historial de vídeos de aprendizaje, ya que podemos identificarte en los diferentes Servicios utilizando cookies y tecnologías similares.
            </Typography>
            <Typography type="title" paragraph>
              4.5 Proveedores de servicios.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Podemos utilizar otras empresas para ayudarnos con nuestros Servicios.
            </Typography>
            <Typography type="body1" paragraph>
              Utilizamos terceras partes para ayudarnos a proporcionar nuestros Servicios (por ejemplo, mantenimiento, análisis, auditorías, pagos, detección de casos de fraude, marketing y desarrollo). Dichas terceras partes tendrán un acceso limitado a tu información en la medida necesaria para ejecutar estas tareas en representación nuestra y están obligadas a no desvelarla ni utilizarla para otros fines.
            </Typography>
            <Typography type="title" paragraph>
              4.6 Divulgaciones requeridas por ley.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Puede que debamos compartir tus datos cuando pensemos que es necesario por ley o para proteger tus derechos, los nuestros y nuestra seguridad.
            </Typography>
            <Typography type="body1" paragraph>
              Puede que debamos divulgar tu información cuando se exija por ley, en una citación u otro procedimiento judicial o si creemos, de buena fe, que la divulgación es razonablemente necesaria para (1) investigar, prevenir o actuar frente a supuestas actividades ilegales o para ayudar a las fuerzas de seguridad; (2) para hacer cumplir las Condiciones de uso; (3) investigar y defendernos de reclamaciones o alegaciones de terceros; (4) proteger la seguridad o la integridad de nuestro Servicio (como compartiendo información con empresas que se enfrentan con amenazas similares); o (5) ejercer o proteger los derechos y la seguridad de LinkedIn, de nuestros Miembros, nuestro personal u otras personas. Trataremos de notificar a los Miembros que sus datos personales han sido solicitados jurídicamente cuando lo consideremos adecuado a nuestro juicio, salvo que se prohíba por ley, por una orden judicial o cuando la solicitud sea una emergencia. Podemos poner en tela de juicio dichos requerimientos cuando consideremos, a nuestro entender, que las solicitudes son demasiado amplias, vagas o carecen de la autoridad necesaria, aunque no nos comprometemos a desafiar cada petición. Para obtener más información consulta nuestras Directrices sobre solicitudes de datos y el Informe de transparencia.
            </Typography>
            <Typography type="title" paragraph>
              4.7 Cambio de control o venta.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Podemos compartir tus datos cuando nuestra empresa se venda a otras empresas, pero deberán utilizarse de acuerdo con esta Política de privacidad.
            </Typography>
            <Typography type="body1" paragraph>
              También podemos compartir tus datos personales como parte de una venta, fusión o cambio de control, o para preparar cualquiera de estas circunstancias. Cualquier otra entidad que compre toda o parte de la empresa tendrá derecho a continuar utilizando tus datos, pero únicamente en el modo descrito en esta Política de privacidad a menos que aceptes lo contrario.
            </Typography>
          </section>
          <section id="obligaciones">
            <Typography type="display1" paragraph className={classes.title}>
              5. Tus opciones y obligaciones
            </Typography>
            <Typography type="title" paragraph>
              5.1 Conservación de datos
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Conservamos la mayor parte de tus datos personales siempre que mantengas la cuenta abierta.
            </Typography>
            <Typography type="body1" paragraph>
              Conservaremos los datos personales que nos facilites mientras tu cuenta siga activa o en la medida en que sea necesario para proporcionarte los Servicios. Incluso aunque solo utilices nuestros Servicios cuando busques un nuevo empleo cada varios años, conservaremos tu información y mantendremos tu perfil abierto hasta que decidas cerrar la cuenta. En algunos casos escogemos conservar determinada información (por ejemplo, las visitas a sitios que tienen los complementos «Compartir en LinkedIn» o «Solicitar con LinkedIn» sin hacer clic en el complemento) de una forma despersonalizada o agregada.
            </Typography>
            <Typography type="title" paragraph>
              5.2 Derecho de acceso y control de tus datos personales
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Puedes acceder o borrar tus datos personales. Tienes muchas opciones a la hora de elegir cómo se recopilan, utilizan y comparten tus datos.
            </Typography>
            <Typography type="body1" paragraph>
              Proporcionamos numerosas opciones para recopilar, utilizar y compartir tus datos, desde borrar o corregir datos que incluyes en el perfil y controlar la visibilidad de tus publicaciones hasta marcar la opción de autoexclusión para publicidad y los controles de las comunicaciones. Puedes acceder a los datos personales que tenemos sobre ti (en el caso de SlideShare, contáctanos).
            </Typography>
            <Typography type="title" paragraph>
              5.3 Cierre de la cuenta.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Conservamos algunos de tus datos incluso después de haber cerrado tu cuenta.
            </Typography>
            <Typography type="body1" paragraph>
              Si decides cerrar tu cuenta de LinkedIn (o SlideShare), tus datos personales dejarán de verse en nuestros Servicios, por lo general, en un plazo de 24 horas. Normalmente, borramos la información de las cuentas cerradas en un plazo de 30 días desde el cierre de la cuenta, salvo en los casos citados a continuación.
            </Typography>
            <Typography type="body1" paragraph>
              Conservaremos tus datos personales incluso después de haber cerrado la cuenta si es razonablemente necesario para cumplir con nuestras obligaciones legales (incluidas, las peticiones de las fuerzas del orden), reunir los requisitos reglamentarios, resolver disputas, mantener la seguridad, evitar casos de fraude y abuso, aplicar nuestras Condiciones de uso o cumplir tu solicitud de darte de baja de futuros mensajes que recibas de LinkedIn. Conservaremos la información despersonalizada después de que cierres tu cuenta.
            </Typography>
            <Typography type="body1" paragraph>
              La información que hayas compartido con otras personas (por ejemplo, a través de mensajes InMail, actualizaciones o publicaciones de grupo) seguirá viéndose después de cerrar la cuenta o de haber borrado la información de tu propio perfil o buzón, y no controlamos los datos que otros Miembros hayan copiado de nuestros Servicios. Los contenidos de Grupos asociados a cuentas cerradas mostrarán a un usuario desconocido como el propietario. Tu perfil podría seguir mostrándose en los servicios de terceros (por ejemplo, los resultados de motores de búsqueda) hasta que actualicen su memoria caché.
            </Typography>
          </section>
          <section id="otros">
            <Typography type="display1" paragraph className={classes.title}>
              6. Otra información importante
            </Typography>
            <Typography type="title" paragraph>
              6.1 Seguridad.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Controlamos e intentamos prevenir los fallos en materia de seguridad. Utiliza las funciones de seguridad disponibles en nuestros Servicios.
            </Typography>
            <Typography type="body1" paragraph>
              Aplicamos medidas de seguridad diseñadas a proteger tus datos, como HTTPS. Controlamos periódicamente nuestros sistemas para detectar posibles vulnerabilidades y ataques. No obstante, no podemos garantizar la seguridad de la información que nos envíes. No hay ninguna garantía de que no se pueda acceder, divulgar, alterar o destruir los datos si se produce una filtración en alguna de nuestras medidas de seguridad físicas, técnicas o de gestión. Visita nuestro Centro de seguridad para mayor información sobre cómo usar nuestros Servicios de manera segura, incluida la autenticación en dos pasos.
            </Typography>
            <Typography type="title" paragraph>
              6.2 Transferencias transfronterizas de datos
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Almacenamos y utilizamos tus datos fuera de tu país.
            </Typography>
            <Typography type="body1" paragraph>
              Procesamos datos tanto dentro como fuera de Estados Unidos. Averigua más sobre los mecanismos jurídicos en los que confiamos para transferir datos entre países.
            </Typography>
            <Typography type="body1" paragraph>
              LinkedIn participa en los Escudos de Privacidad UE-EE. UU. y Suiza-EE. UU. Para obtener más información, consulta nuestra Declaración sobre el Escudo de Privacidad.
            </Typography>
            <Typography type="title" paragraph>
              6.3 Marketing directo y señales de «no rastreo»
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Nuestras declaraciones sobre el marketing directo y las señales de «no rastreo»
            </Typography>
            <Typography type="body1" paragraph>
              Actualmente no compartimos datos personales con terceros para fines de marketing directo sin tu permiso. Averigua más sobre este asunto y sobre nuestra respuesta a las señales de «no rastreo».
            </Typography>
            <Typography type="title" paragraph>
              6.4 Información de contacto
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Puedes contactarnos o utilizar otras opciones para resolver cualquier queja.
            </Typography>
            <Typography type="body1" paragraph>
              Si tienes alguna pregunta o queja sobre esta Política, contacta con LinkedIn en línea primero. También puedes contactarnos por correo postal. Si tras contactarnos no se resuelve tu queja, existen otras opciones disponibles.
            </Typography>
          </section>
        </div>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    );
  }
}

Privacy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Privacy);
