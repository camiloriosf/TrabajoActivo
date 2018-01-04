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

class Terms extends Component {
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
            Condiciones de Uso
          </Typography>
          <Typography type="subheading" paragraph>
            Nuestro objetivo es conectar a profesionales de todo el mundo para ayudarles a ser más productivos y a alcanzar sus metas laborales. Nuestros servicios han sido diseñados para promover oportunidades económicas para nuestros miembros al permitir que tú y millones de profesionales os conozcáis, intercambiéis ideas, aprendáis y encontréis oportunidades o empleados, trabajéis y toméis decisiones en una red de relaciones de confianza.
          </Typography>
          <Divider className={classes.divider} />
          <section id="introduccion">
            <Typography type="display1" paragraph className={classes.title}>
              1. Introducción
            </Typography>
            <Typography type="title" paragraph>
              1.1 Contrato
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Cuando utilizas nuestros Servicios aceptas cumplir todos estos términos. Tu uso de nuestros Servicios también está sujeto a nuestra Política de cookies y a nuestra Política de privacidad, que abarca el modo en que recabamos, utilizamos, compartimos y almacenamos tu información personal.
            </Typography>
            <Typography type="body1" paragraph>
              Al hacer clic en «Únete ahora», «Únete a LinkedIn», «Regístrate» u otro enlace similar, al registrarte, acceder o utilizar nuestros servicios (descritos a continuación), aceptas suscribir un contrato vinculante desde el punto de vista jurídico con LinkedIn (incluso si estás utilizando nuestros Servicios en nombre de una empresa). Si no estás conforme con este contrato («Contrato» o «Condiciones de uso»), no hagas clic en «Únete ahora» (u otro enlace similar) y no accedas ni utilices de otro modo nuestros Servicios.
            </Typography>
            <Typography type="body1" paragraph>
              Tu uso de nuestros Servicios está también sujeto a nuestra <Link href="/privacy"><a>Política de privacidad</a></Link>.
            </Typography>
            <Typography type="body2">
              Servicios
            </Typography>
            <Typography type="body1" paragraph>
              Este Contrato se aplica a LinkedIn.com, a las aplicaciones de la marca de LinkedIn, a Slideshare, a LinkedIn Learning y a otros sitios relacionados con LinkedIn, aplicaciones, comunicaciones y otros servicios que enuncian que se ofrecen en virtud de este Contrato («Servicios»), incluida la recopilación de datos al margen del sitio web para esos Servicios, como nuestros anuncios y los complementos «Solicitar con LinkedIn» y «Compartir con LinkedIn». Los usuarios suscritos a nuestros Servicios son «Miembros» y los usuarios no registrados son «Visitantes». Este Contrato se aplica a ambos.
            </Typography>
            <Typography type="body2">
              BitterSweet
            </Typography>
            <Typography type="body1" paragraph>
              Estás suscribiendo este Contrato con LinkedIn (también referido como «nosotros» o «nuestro»). Si resides en Estados Unidos, estás formalizando este Contrato con LinkedIn Corporation y los datos personales que nos proporciones o se recopilen en nuestros Servicios serán controlados por LinkedIn Corporation. Si resides fuera de Estados Unidos, estás formalizando este Contrato con LinkedIn Ireland U.C. y los datos personales que nos proporciones o se recopilen en nuestros Servicios serán controlados por LinkedIn Ireland U.C.
            </Typography>
            <Typography type="title" paragraph>
              1.2 Miembros y Visitantes
            </Typography>
            <Typography type="body1" paragraph>
              Cuando te registras y te unes al Servicio de LinkedIn, te conviertes en Miembro. Si has decidido no registrarte en nuestros Servicios, puedes acceder a determinadas funcionalidades como Visitante.
            </Typography>
            <Typography type="title" paragraph>
              1.3 Cambios
            </Typography>
            <Typography type="body1" paragraph>
              Podemos modificar este Contrato, nuestra Política de privacidad y nuestra Política de cookies de vez en cuando. Si introducimos algún cambio importante en el Contrato te avisaremos a través de nuestros Servicios, o por otros medios, para darte la oportunidad de revisar los cambios antes de que se hagan efectivos. Si no estás de acuerdo con cualquiera de los cambios, puedes <Link href="/settings"><a>cerrar tu cuenta</a></Link>. Tu uso continuado de nuestros Servicios después de publicar o de enviar un aviso sobre los cambios en estos términos significará que estás de acuerdo con los términos actualizados.
            </Typography>
          </section>
          <section id="obligaciones">
            <Typography type="display1" paragraph className={classes.title}>
              2. Obligaciones
            </Typography>
            <Typography type="title" paragraph>
              2.1 Requisitos para utilizar los Servicios
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Estas son algunas de las cosas a las que te comprometes en este Contrato:
              <br /><br />
              Cumples los requisitos para suscribir este Contrato y tienes al menos la «Edad mínima» establecida.
            </Typography>
            <Typography type="body1" paragraph>
              Los menores de 16 años no pueden usar los Servicios
            </Typography>
            <Typography type="body1" paragraph>
              Para utilizar los Servicios, aceptas que: (1) tienes al menos la «Edad mínima» (definida a continuación); (2) solo tendrás una cuenta de LinkedIn (y/o una cuenta de SlideShare, si procede), que deberá estar a tu nombre real; y (3) LinkedIn no te ha restringido el uso de los Servicios.
            </Typography>
            <Typography type="body1" paragraph>
              Los Miembros que tenían menos de esta nueva Edad mínima cuando comenzaron a utilizar los Servicios en virtud de unas Condiciones de uso anteriores podrán continuar utilizándolos, ya que pueden haber alcanzado la nueva Edad mínima desde entonces o cumplir esa edad en un futuro próximo.
            </Typography>
            <Typography type="body1" paragraph>
              «Edad mínima» significa 16 años. No obstante, si la legislación aplicable exige que debes tener más edad para que LinkedIn te proporcione lícitamente los Servicios sin consentimiento de tus padres (incluido el uso de tus datos personales), entonces la Edad mínima será esa otra edad.
            </Typography>
            <Typography type="title" paragraph>
              2.2 Tu cuenta
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Protegerás tu contraseña.
              <br /><br />
              No compartirás tu cuenta con ninguna otra persona y respetarás nuestras normas y la legislación aplicable.
            </Typography>
            <Typography type="body1" paragraph>
              Los Miembros son los titulares de las cuentas. Acuerdas: (1) intentar escoger una contraseña difícil y segura; (2) proteger y mantener la confidencialidad de la contraseña; (3) no transferir ninguna parte de tu cuenta (por ejemplo, los contactos) y (4) cumplir la legislación pertinente y nuestra lista de lo que se debe y no se debe hacer. Eres responsable de todo lo que suceda en tu cuenta salvo que la cierres o que nos notifiques que se está haciendo un uso indebido de la misma.
            </Typography>
            <Typography type="body1" paragraph>
              Entre los demás y tú (incluida tu empresa), tu cuenta te pertenece. No obstante, si los Servicios han sido adquiridos por terceros para que tú los utilices (por ejemplo, una licencia de Recruiter que ha comprado tu empresa), ese tercero que paga por dichos Servicios tendrá derecho a controlar el acceso y a recibir informes sobre el uso que realices del Servicio de pago; pero no tendrá derechos sobre tu cuenta personal.
            </Typography>
            <Typography type="title" paragraph>
              2.3 Pago
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Cumplirás tus obligaciones de pago y aceptas que almacenemos tu información de pago. Comprendes que puede haber tasas e impuestos añadidos a nuestros precios.
              <br /><br />
              No garantizamos los reembolsos.
            </Typography>
            <Typography type="body1" paragraph>
              Si adquieres alguno de nuestros Servicios de pago («Servicios Premium»), aceptas abonarnos las tasas y los impuestos aplicables y cumplir los términos adicionales específicos vinculados a dichos Servicios de pago. El impago de estas tasas puede dar lugar a la finalización de los Servicios de pago que recibes. También aceptas que:
            </Typography>
            <Typography type="body1" paragraph>
              • Tu compra puede estar sujeta a comisiones de cambio o a diferencias de precios en función de tu ubicación (por ejemplo, tasas de cambio).
            </Typography>
            <Typography type="body1" paragraph>
              • Podemos almacenar y continuar facturando tu forma de pago (como una tarjeta de crédito), incluso después de haber caducado, para evitar la interrupción de los Servicios y utilizarla para pagar otros Servicios que puedas adquirir.
            </Typography>
            <Typography type="body1" paragraph>
              • Si adquieres una suscripción, se cargarán de forma automática a tu forma de pago al comienzo de cada periodo de suscripción las tasas e impuestos aplicables a ese periodo. Para evitar futuros cargos, cancela la suscripción antes de la fecha de renovación. Averigua cómo cancelar o suspender tus Servicios Premium.
            </Typography>
            <Typography type="body1" paragraph>
              • Todas tus compras de Servicios están sujetas a la política de reembolso de LinkedIn.
            </Typography>
            <Typography type="body1" paragraph>
              • Podemos calcular los impuestos aplicables en función de la información de facturación que nos proporciones en el momento de la compra.
            </Typography>
            <Typography type="body1" paragraph>
              Puedes obtener una copia de tu factura a través de tu configuración de cuenta en LinkedIn bajo «Historial de compra».
            </Typography>
            <Typography type="title" paragraph>
              2.4 Avisos y mensajes sobre los Servicios
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Aceptas que te enviemos avisos a través de nuestros sitios web, de las aplicaciones y de la información de contacto que nos proporcionaste. Si la información de contacto que nos proporciones no está actualizada, podrías no recibir estos avisos importantes.
            </Typography>
            <Typography type="body1" paragraph>
              Aceptas que nos comuniquemos contigo de los siguientes modos: (1) un aviso en el Servicio, o (2) un mensaje enviado a la información de contacto que nos proporcionaste (por ejemplo, correo electrónico, teléfono móvil, dirección postal). Acuerdas mantener actualizada tu información de contacto.
            </Typography>
            <Typography type="body1" paragraph>
              Revisa tu configuración para controlar y limitar los mensajes que te enviamos.
            </Typography>
            <Typography type="title" paragraph>
              2.5 Compartir
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Cuando compartas información, otras personas podrán ver, copiar y usar esa información.
            </Typography>
            <Typography type="body1" paragraph>
              Nuestros Servicios permiten enviar mensajes y compartir información de muchos modos, como en tu perfil, en diapositivas, en enlaces a artículos de noticias, en anuncios de empleo, en mensajes InMail y en blogs. La información y el contenido que compartes o publicas pueden ser vistos por otros Miembros o Visitantes. Cuando exista la posibilidad de establecer una configuración, respetaremos las opciones que escojas sobre quién puede ver el contenido o la información (por ejemplo, el contenido de mensajes enviado a los destinatarios, compartir contenido solo con los contactos de LinkedIn, restringir la visibilidad de tu perfil en los motores de búsqueda u optar por no notificar a los demás miembros que has actualizado tu perfil de LinkedIn). Para actividades de búsqueda de empleo, la configuración por defecto es no notificar a tu red de contactos o al público. Así que si solicitas un empleo a través de nuestros Servicios o si decides indicar que estás interesado en un empleo, nuestra configuración por defecto es compartirlo solo con el anunciante del empleo.
            </Typography>
            <Typography type="body1" paragraph>
              No estamos obligados a publicar información o contenidos en nuestro Servicio y podremos retirarlos a nuestra entera discreción, con o sin previo aviso.
            </Typography>
          </section>
          <section id="derechos">
            <Typography type="display1" paragraph className={classes.title}>
              3. Derechos y limitaciones
            </Typography>
            <Typography type="title" paragraph>
              3.1 Tu licencia respecto a LinkedIn
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Eres el propietario de todo el contenido, los comentarios y los datos personales que nos proporciones, pero también nos otorgas una licencia no exclusiva respecto a dicha información.
              <br /><br />
              Respetaremos las decisiones que tomes sobre quién podrá ver tu información y contenido.
              <br /><br />
              Te comprometes a suministrarnos únicamente la información y el contenido sobre los que tengas derecho y a que la información en tu perfil de LinkedIn sea verdadera.
            </Typography>
            <Typography type="body1" paragraph>
              Entre tú y LinkedIn, eres el propietario del contenido y de la información que proporciones o publiques en los Servicios, y solo otorgas a LinkedIn y a nuestras filiales la siguiente licencia no exclusiva: un derecho mundial, transferible y sujeto a sublicencia para usar, copiar, modificar, distribuir, publicar y tratar la información y los contenidos que nos proporciones a través de nuestros Servicios sin ningún consentimiento adicional, notificación o compensación para ti o terceros. Estos derechos se limitan de los siguientes modos:
            </Typography>
            <Typography type="body1" paragraph>
              1. Puedes finalizar esta licencia para un contenido específico borrando dicho contenido de los Servicios, o en general cerrando tu cuenta, salvo (a) en la medida en que lo hayas compartido con otras personas como parte del Servicio y estas a su vez lo hayan copiado, vuelto a compartir o almacenado y (b) durante el tiempo razonable que se tarde en retirarlo de las copias de seguridad y de otros sistemas.
            </Typography>
            <Typography type="body1" paragraph>
              2. No incluiremos tu contenido en publicidad para productos y servicios de terceros sin tu consentimiento personal (incluido el contenido patrocinado). No obstante, tenemos derecho, sin indemnizarte a ti o a terceros, a publicar anuncios cerca de tu contenido e información, y tus acciones sociales en el contenido patrocinado podrán verse tal y como se describe en la Política de privacidad.
            </Typography>
            <Typography type="body1" paragraph>
              3. Te pediremos tu consentimiento si queremos otorgar a terceros el derecho a publicar tu información fuera del Servicio. No obstante, otros Miembros y/o Visitantes podrían acceder y compartir tu contenido e información en función de tu configuración.
            </Typography>
            <Typography type="body1" paragraph>
              4. Aunque podemos editar y realizar cambios de formato en tu contenido (como traducirlo, modificar el tamaño, el diseño o el tipo de archivo, o eliminar metadatos), no modificaremos el significado.
            </Typography>
            <Typography type="body1" paragraph>
              5. Como eres propietario de tu contenido e información, y solo poseemos derechos no exclusivos respecto a los mismos, puedes escoger compartirlo con terceros, incluido a través de una licencia de Creative Commons.
            </Typography>
            <Typography type="body1" paragraph>
              Aceptas que podemos acceder, almacenar y utilizar cualquier información que facilites de acuerdo con los términos de la Política de privacidad y de tus elecciones (incluida la configuración).
            </Typography>
            <Typography type="body1" paragraph>
              Al enviar a LinkedIn sugerencias u otros comentarios sobre nuestros Servicios, aceptas que LinkedIn utilice y comparta (aunque no tiene que hacerlo) dichos comentarios para cualquier finalidad sin compensarte.
            </Typography>
            <Typography type="body1" paragraph>
              Aceptas solo proporcionar contenido e información que no infrinja la ley ni los derechos de ninguna persona (incluidos los derechos de propiedad intelectual). También acuerdas facilitar información verdadera en tu perfil. A LinkedIn se le puede exigir por ley retirar determinada información o contenido en ciertos países.
            </Typography>
            <Typography type="title" paragraph>
              3.2 Disponibilidad de los Servicios
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Podemos cambiar, suspender o retirar cualquier Servicio, o cambiar y modificar futuras tarifas a nuestra entera discreción. En la medida en que lo permita la ley, estos cambios se harán efectivos cuando se te comuniquen.
            </Typography>
            <Typography type="body1" paragraph>
              Podemos cambiar o retirar cualquiera de nuestros Servicios. No podemos garantizar que almacenaremos o que continuaremos mostrando la información o el contenido que hayas publicado.
            </Typography>
            <Typography type="body1" paragraph>
              LinkedIn no es un servicio de almacenamiento. Aceptas que no tenemos la obligación de almacenar, conservar o proporcionarte una copia de cualquier contenido o información que nos facilites tú u otras personas, salvo en la medida en que se exija por ley y tal y como se señala en nuestra Política de privacidad.
            </Typography>
            <Typography type="title" paragraph>
              3.3 Otros contenidos, sitios web y aplicaciones.
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Tu uso del contenido y de la información de otras personas publicados en nuestros Servicios corre por tu propia cuenta y riesgo.
              <br /><br />
              Terceros podrían ofrecer sus propios productos y servicios a través de LinkedIn, pero no nos responsabilizamos de las actividades que realicen esas terceras partes.
            </Typography>
            <Typography type="body1" paragraph>
              Al utilizar los Servicios, podrías encontrar información o contenido inexactos, incompletos, atrasados, engañosos, ilegales, ofensivos o dañinos. LinkedIn no revisa por lo general el contenido proporcionado por sus Miembros u otras personas. Aceptas que no eres responsable del contenido o de la información de otras personas (incluidos otros Miembros). No siempre podemos evitar dicho uso indebido de nuestros Servicios, y aceptas que no eres responsable de dicho uso. También reconocemos el riesgo de que tú o de que tu organización seáis asociados por error a contenidos sobre otras personas cuando permitimos que los contactos y los seguidores sepan que tú o tu organización habéis sido mencionados en las noticias. Puedes autoexcluirte de esta funcionalidad.
            </Typography>
            <Typography type="body1" paragraph>
              Eres responsable de decidir si quieres acceder o utilizar aplicaciones o sitios web de terceros que poseen un enlace desde nuestros Servicios. Si permites que una aplicación o sitio web te autentifique o se conecte a tu cuenta de LinkedIn, dicha aplicación o sitio web podrá acceder a información en LinkedIn relacionada contigo y con tus contactos. Las aplicaciones y sitios web de terceros tienen sus propios términos jurídicos y políticas de privacidad, y podrías estar otorgando permiso a terceros para que utilicen tu información de forma que nosotros no la usaríamos. Excepto en los casos limitados en que lo exija la legislación pertinente, LinkedIn no es responsable de estos otros sitios web y aplicaciones; utilízalos por tu propia cuenta y riesgo. Consulta nuestra Política de privacidad.
            </Typography>
            <Typography type="title" paragraph>
              3.4 Limitaciones
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Tenemos derecho a limitar el modo en que te conectas e interactúas con nuestros Servicios.
            </Typography>
            <Typography type="body1" paragraph>
              LinkedIn se reserva el derecho a limitar tu uso de los Servicios, incluidos tu número de contactos y tu capacidad para contactar con otros Miembros. LinkedIn se reserva el derecho de restringir, suspender o cerrar tu cuenta si considera que puedes haber incumplido este Contrato, la ley o que estás utilizando incorrectamente los Servicios (por ejemplo, has infringido la lista de lo que se debe y no se debe hacer).
            </Typography>
            <Typography type="title" paragraph>
              3.5 Derechos de propiedad intelectual
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              A continuación te proporcionamos información sobre nuestros derechos de propiedad intelectual.
            </Typography>
            <Typography type="body1" paragraph>
              LinkedIn se reserva todos sus derechos de propiedad intelectual en los Servicios. La utilización de los Servicios no te confiere la propiedad de los mismos ni del contenido o de la información que se muestra a través de los mismos. Las marcas y los logotipos utilizados en relación con los Servicios son las marcas comerciales de sus respectivos propietarios. LinkedIn, SlideShare y los logotipos «in» y otras marcas de LinkedIn, las marcas de servicio, los gráficos y los logotipos utilizados para nuestros Servicios son marcas registradas de LinkedIn.
            </Typography>
          </section>
          <section id="exclusion">
            <Typography type="display1" paragraph className={classes.title}>
              4. Exclusión y limitación de responsabilidad
            </Typography>
            <Typography type="title" paragraph>
              4.1 Exclusión de garantía
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Renunciamos a cualquier responsabilidad jurídica derivada de la calidad, seguridad o fiabilidad de nuestros Servicios.
            </Typography>
            <Typography type="body1" paragraph>
              EN LA MEDIDA EN QUE LO PERMITA LA LEY, LINKEDIN Y SUS AFILIADOS (Y QUIENES TRABAJAN CON LINKEDIN PARA PROPORCIONAR LOS SERVICIOS) (A) NO SE HACEN RESPONSABLES DE NINGUNA GARANTÍA IMPLÍCITA O REPRESENTACIÓN (COMO GARANTÍAS DE COMERCIALIZACIÓN, ADECUACIÓN PARA UN FIN PARTICULAR, EXACTITUD DE LOS DATOS Y DE NO INFRACCIÓN); (B) NO GARANTIZAN QUE LOS SERVICIOS PODRÁN UTILIZARSE SIN INTERRUPCIONES O SIN ERRORES DE FUNCIONAMIENTO, Y (C) PROPORCIONARÁN EL SERVICIO (INCLUIDO EL CONTENIDO Y LA INFORMACIÓN) TAL Y COMO ESTÉ DISPONIBLE.
            </Typography>
            <Typography type="body1" paragraph>
              ALGUNAS LEYES NO PERMITEN DETERMINADAS EXCLUSIONES DE RESPONSABILIDAD, POR LO QUE ALGUNAS O TODAS ESTAS EXCLUSIONES PODRÍAN NO APLICARSE EN TU CASO.
            </Typography>
            <Typography type="title" paragraph>
              4.2 Exclusión de responsabilidad
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Estas son las limitaciones de responsabilidad jurídica que podemos tener en relación contigo.
            </Typography>
            <Typography type="body1" paragraph>
              EN LA MEDIDA EN QUE LO PERMITA LA LEY (Y SALVO QUE LINKEDIN HAYA SUSCRITO UN CONTRATO ESCRITO INDEPENDIENTE QUE REEMPLACE ESTE CONTRATO), LINKEDIN Y SUS AFILIADOS (Y QUIENES TRABAJAN CON LINKEDIN PARA PROPORCIONAR LOS SERVICIOS) NO SE HARÁN RESPONSABLES DE NINGÚN DAÑO INDIRECTO, INHERENTE, ESPECIAL, CONSECUENTE O PUNITIVO, O POR LA PÉRDIDA DE DATOS, DE OPORTUNIDADES, DE REPUTACIÓN O DE BENEFICIOS O INGRESOS RELACIONADOS CON LOS SERVICIOS (COMO DECLARACIONES OFENSIVAS O DIFAMATORIAS, TIEMPO PERDIDO, USO O CAMBIOS EN TU INFORMACIÓN O CONTENIDO).
            </Typography>
            <Typography type="body1" paragraph>
              LA RESPONSABILIDAD DE LINKEDIN Y SUS AFILIADOS (Y DE QUIENES TRABAJAN CON LINKEDIN PARA PROPORCIONAR LOS SERVICIOS) NO SUPERARÁ EN NINGÚN CASO, UNA VEZ SUMADAS TODAS LAS REIVINDICACIONES, LA CANTIDAD QUE SEA INFERIOR DE (A) CINCO VECES LA CUOTA MENSUAL O ANUAL MÁS RECIENTE QUE HAYAS PAGADO POR UN SERVICIO PREMIUM, SI CORRESPONDE, O (B) 1.000 USD.
            </Typography>
            <Typography type="body1" paragraph>
              ESTA LIMITACIÓN DE RESPONSABILIDAD FORMA PARTE DEL ACUERDO ENTRE TÚ Y LINKEDIN, Y SE APLICARÁ A TODAS LAS RECLAMACIONES DE RESPONSABILIDAD (COMO GARANTÍA, DAÑO, NEGLIGENCIA, CONTRATO, LEY), INCLUSO AUNQUE SE HAYA COMUNICADO A LINKEDIN Y A SUS AFILIADOS ESTE DAÑO, E INCLUSO AUNQUE ESTAS SOLUCIONES NO SUBSANEN SU FINALIDAD ESENCIAL.
            </Typography>
            <Typography type="body1" paragraph>
              ALGUNAS LEYES NO PERMITEN LA LIMITACIÓN O EXCLUSIÓN DE RESPONSABILIDAD, POR LO QUE ESTAS LIMITACIONES PODRÍAN NO APLICARSE EN TU CASO.
            </Typography>
          </section>
          <section id="rescision">
            <Typography type="display1" paragraph className={classes.title}>
              5. Rescisión
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              Podemos rescindir este Contrato en cualquier momento.
            </Typography>
            <Typography type="body1" paragraph>
              Tanto tú como LinkedIn podréis dar por concluido este Contrato en cualquier momento tras comunicarlo a la otra parte. Una vez rescindido, perderás el derecho a acceder y utilizar los Servicios. Lo siguiente continuará aplicándose tras la rescisión:
            </Typography>
            <Typography type="body1" paragraph>
              • Nuestro derecho a utilizar y divulgar tus comentarios.
            </Typography>
            <Typography type="body1" paragraph>
              • El derecho de los Miembros y de los Visitantes a volver a compartir contenido e información que compartiste a través del Servicio siempre que fueran copiados o vueltos a compartir antes de la rescisión.
            </Typography>
            <Typography type="body1" paragraph>
              • Las cláusulas 4, 6 y 7 de este Contrato.
            </Typography>
            <Typography type="body1" paragraph>
              • Cualquier importe debido por cualquiera de las partes antes de la rescisión continuará debiéndose después de la misma.
            </Typography>
            <Typography type="body1" paragraph>
              Puedes visitar nuestro Centro de ayuda para cerrar tu cuenta.
            </Typography>
          </section>
          <section id="resolucion">
            <Typography type="display1" paragraph className={classes.title}>
              6. Resolución de conflictos
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              En el caso improbable de que se produjera una disputa legal, acordamos someternos a los tribunales de California (y a la jurisdicción de California) o de Dublín, los tribunales de Irlanda (y a la jurisdicción irlandesa).
            </Typography>
            <Typography type="body1" paragraph>
              Si vives en la Unión Europea: aceptas que las leyes de Irlanda, excepto en los casos de conflicto de jurisdicción, prevalecerán en cualquier disputa relacionada con este Contrato y/o los Servicios. Ambas partes acordamos que todas estas demandas solo podrán presentarse en Dublín, Irlanda, y ambas partes aceptamos someternos a la jurisdicción de los tribunales de Dublín, Irlanda.
            </Typography>
            <Typography type="body1" paragraph>
              En todos los demás casos, incluidas las personas que viven fuera de Estados Unidos, aceptas que la legislación del estado de California, EE. UU., excepto en los casos de conflicto de jurisdicción, prevalecerá en cualquier disputa relacionada con este Contrato y/o los Servicios. Ambas partes acordamos que todas estas demandas solo podrán presentarse ante los tribunales federales o estatales del condado de Santa Clara, California, EE. UU., y ambas partes aceptamos someternos a la jurisdicción de esos tribunales.
            </Typography>
          </section>
          <section id="disposiciones">
            <Typography type="display1" paragraph className={classes.title}>
              7. Disposiciones generales
            </Typography>
            <Typography type="subheading" className={classes.quote} paragraph>
              A continuación se describen algunos detalles importantes sobre cómo leer el Contrato.
            </Typography>
            <Typography type="body1" paragraph>
              Si un tribunal con autoridad sobre este Contrato encuentra que no puede aplicarse alguna parte del mismo, tú y nosotros aceptamos que el tribunal modifique los términos para que esa parte sí pueda aplicarse y siga logrando su finalidad. Si el tribunal no pudiera conseguirlo, tú y nosotros acordamos pedir al tribunal que elimine esa parte que no puede aplicarse y que mantenga el resto del Contrato. En la medida en que lo permita la ley, la versión en inglés de este Contrato es vinculante, mientras que las traducciones se ofrecen por motivos de comodidad únicamente. Este Contrato (incluidos los términos adicionales que establezcamos cuando interacciones con una funcionalidad de los Servicios) es el único acuerdo entre nosotros sobre los Servicios y reemplaza todos los acuerdos anteriores sobre los Servicios.
            </Typography>
            <Typography type="body1" paragraph>
              Si no actuamos en caso de incumplimiento de este Contrato, ello no significa que LinkedIn haya renunciado a su derecho a hacer valer el Contrato. No puedes ceder o transferir este Contrato (o tu cuenta o uso de los Servicios) a nadie sin nuestro consentimiento. No obstante, aceptas que LinkedIn ceda este Contrato a sus filiales o a una tercera parte que lo compre sin tu consentimiento. No existen otros terceros beneficiarios del Contrato.
            </Typography>
            <Typography type="body1" paragraph>
              Nos reservamos el derecho de cambiar los términos de este Contrato y te avisaremos si lo hacemos; aceptamos que los cambios no podrán ser retroactivos. Si no estás de acuerdo con estos cambios, deberás dejar de utilizar los Servicios.
            </Typography>
            <Typography type="body1" paragraph>
              Aceptas que el único modo de enviarnos una notificación legal será en la dirección proporcionada en la cláusula 10.
            </Typography>
          </section>
          <section id="deberes">
            <Typography type="display1" paragraph className={classes.title}>
              8. Lo que se debe y no se debe hacer en LinkedIn
            </Typography>
            <Typography type="title" paragraph>
              8.1 Lo que se debe hacer
            </Typography>
            <Typography type="body2" paragraph>
              Aceptas que vas a:
            </Typography>
            <Typography type="body1" paragraph>
              a. Cumplir todas las leyes pertinentes, incluidas, entre otras, las leyes de privacidad, las leyes de propiedad intelectual, las leyes antispam, las leyes de control de las exportaciones, las leyes en materia fiscal y tributaria, y otros requisitos regulatorios.
            </Typography>
            <Typography type="body1" paragraph>
              b. Proporcionarnos información exacta y mantenerla actualizada.
            </Typography>
            <Typography type="body1" paragraph>
              c. Usar tu nombre verdadero en el perfil.
            </Typography>
            <Typography type="body1" paragraph>
              d. Usar los Servicios de una manera profesional.
            </Typography>
            <Typography type="title" paragraph>
              8.2 Lo que no se debe hacer
            </Typography>
            <Typography type="body2" paragraph>
              Aceptas que no vas a:
            </Typography>
            <Typography type="body1" paragraph>
              a. Actuar de manera ilegal o poco profesional en relación con nuestros Servicios, incluidas las actitudes deshonestas, abusivas o discriminatorias.
            </Typography>
            <Typography type="body1" paragraph>
              b. Publicar contenido inexacto, obsceno difamatorio, impactante, que incite al odio, amenazador o de otro modo inapropiado o que derive en quejas o disputas personales.
            </Typography>
            <Typography type="body1" paragraph>
              c. Usar una imagen o una foto de cara que no se parezca a ti en el perfil.
            </Typography>
            <Typography type="body1" paragraph>
              d. Crear una identidad falsa en LinkedIn. La creación ocasional de perfiles claramente ficticios por parte de LinkedIn o con su permiso expreso en relación con una campaña promocional no exonera de esta obligación.
            </Typography>
            <Typography type="body1" paragraph>
              e. Representar de manera falsa tu identidad (por ejemplo, utilizar un pseudónimo), tus puestos de trabajo actuales o anteriores, tus calificaciones o vínculos con una persona o entidad.
            </Typography>
            <Typography type="body1" paragraph>
              f. Crear un perfil de Miembro para alguien que no seas tú (una persona física).
            </Typography>
            <Typography type="body1" paragraph>
              g. Invitar a personas que no conoces para que se unan a tu red.
            </Typography>
            <Typography type="body1" paragraph>
              h. Usar o intentar usar la cuenta de otra persona.
            </Typography>
            <Typography type="body1" paragraph>
              i. Acosar, abusar o hacer daño a otra persona.
            </Typography>
            <Typography type="body1" paragraph>
              j. Enviar o publicar publicidad no solicitada o no autorizada, «correo basura», «spam», «cartas en cadena», «estafas piramidales» o cualquier otra forma de publicidad no autorizada por LinkedIn.
            </Typography>
            <Typography type="body1" paragraph>
              k. Desarrollar, apoyar o utilizar programas, dispositivos, guiones, robots o cualquier otro medio o proceso (incluidos crawlers, plugins de navegación y complementos, o cualquier otra tecnología o programas manuales) para plagiar (scrape) los Servicios o copiar de otro modo perfiles u otros datos de los Servicios.
            </Typography>
            <Typography type="body1" paragraph>
              l. Evitar o sortear cualquier control de acceso o los límites en el uso de los Servicios (como límites en las búsquedas de palabras clave).
            </Typography>
            <Typography type="body1" paragraph>
              m. Copiar, utilizar, divulgar o distribuir cualquier información obtenida de los Servicios, ya sea de forma directa o a través de terceros (como los motores de búsqueda), sin el consentimiento de LinkedIn.
            </Typography>
            <Typography type="body1" paragraph>
              n. Solicitar direcciones de correo electrónico u otra información personal de miembros que no conoces, sin su autorización.
            </Typography>
            <Typography type="body1" paragraph>
              o. Utilizar, revelar o distribuir cualquier dato obtenido infringiendo esta política.
            </Typography>
            <Typography type="body1" paragraph>
              p. Revelar información que no tienes derecho a revelar (como información confidencial de otras personas, incluida tu empresa).
            </Typography>
            <Typography type="body1" paragraph>
              q. Infringir los derechos de propiedad intelectual de otras personas como derechos de autor, patentes, marcas, secretos comerciales u otros derechos de propiedad. Por ejemplo, no copies ni distribuyas (salvo a través de la funcionalidad de compartir disponible) las publicaciones u otros contenidos de otras personas sin su permiso, el cual se puede otorgar publicando a través de una licencia de Creative Commons.
            </Typography>
            <Typography type="body1" paragraph>
              r. Infringir la propiedad intelectual u otros derechos de LinkedIn, incluido, sin limitación, (i) copiar o distribuir nuestros vídeos de aprendizaje u otros materiales; o (ii) copiar o distribuir nuestra tecnología, salvo que se ponga en circulación con licencias de código abierto; (iii) utilizar el término «LinkedIn» o nuestros logotipos en cualquier nombre comercial, correo electrónico o URL excepto en los casos descritos en las Directrices de marca.
            </Typography>
            <Typography type="body1" paragraph>
              s. Utilizar las invitaciones de LinkedIn para enviar mensajes a personas que no te conocen o que es poco probable que te reconozcan como un contacto conocido.
            </Typography>
            <Typography type="body1" paragraph>
              t. Publicar cualquier cosa que contenga virus de programas, gusanos o cualquier otro código dañino.
            </Typography>
            <Typography type="body1" paragraph>
              u. Manipular los identificadores para ocultar el origen de cualquier mensaje o publicación transmitidos a través de los Servicios.
            </Typography>
            <Typography type="body1" paragraph>
              v. Crear perfiles o proporcionar contenidos que promuevan los servicios de compañía o de prostitución.
            </Typography>
            <Typography type="body1" paragraph>
              w. Crear u operar un esquema piramidal, fraude u otra práctica similar.
            </Typography>
            <Typography type="body1" paragraph>
              x. Utilizar técnicas de ingeniería inversa, descompilar, desarmar, descifrar o de otro modo tratar de obtener el código fuente de los Servicios o de cualquier tecnología relacionada que no sea de código abierto.
            </Typography>
            <Typography type="body1" paragraph>
              y. Dar a entender o declarar que estás asociado o avalado por LinkedIn sin nuestro consentimiento expreso (por ejemplo, presentarte como formador acreditado de LinkedIn).
            </Typography>
            <Typography type="body1" paragraph>
              z. Alquilar, arrendar, prestar, hacer negocios, vender o revender el acceso a los Servicios o a datos relacionados.
            </Typography>
            <Typography type="body1" paragraph>
              aa. Vender, patrocinar u obtener de otro modo un beneficio económico de cualquier Servicio sin el consentimiento de LinkedIn.
            </Typography>
            <Typography type="body1" paragraph>
              ab. Establecer enlaces a nuestros Servicios para cualquier otra finalidad que la de promover tu perfil o un grupo en nuestros Servicios, sin el consentimiento de LinkedIn.
            </Typography>
            <Typography type="body1" paragraph>
              ac. Retirar avisos de derechos de autor, de marcas registradas o de otros derechos de propiedad contenidos en nuestro Servicio.
            </Typography>
            <Typography type="body1" paragraph>
              ad. Retirar, cubrir u ocultar cualquier publicidad incluida en los Servicios.
            </Typography>
            <Typography type="body1" paragraph>
              ae. Utilizar bots u otros métodos automatizados para acceder a los Servicios, para añadir o descargar contactos o para enviar o redirigir mensajes.
            </Typography>
            <Typography type="body1" paragraph>
              af. Controlar la disponibilidad, el rendimiento o el funcionamiento de los Servicios con fines competitivos.
            </Typography>
            <Typography type="body1" paragraph>
              ag. Realizar «framing» o «mirroring» o simular de otro modo la apariencia o función de los Servicios.
            </Typography>
            <Typography type="body1" paragraph>
              ah. Superponer o modificar de otro modo los Servicios o su apariencia.
            </Typography>
            <Typography type="body1" paragraph>
              ai. Acceder a los Servicios salvo a través de las interfaces expresamente proporcionadas por LinkedIn, como sus aplicaciones móviles, linkedin.com y slideshare.net.
            </Typography>
            <Typography type="body1" paragraph>
              aj. Utilizar un Servicio para tareas diferentes de las previstas.
            </Typography>
            <Typography type="body1" paragraph>
              ak. Anular cualquier funcionalidad de seguridad de los Servicios.
            </Typography>
            <Typography type="body1" paragraph>
              al. Interferir en el funcionamiento o cargar los Servicios de manera poco razonable (por ejemplo, spam, ataque mediante denegación de servicio, virus, algoritmos de juego).
            </Typography>
            <Typography type="body1" paragraph>
              am. Infringir las Pautas comunitarias profesionales o cualquier otro término adicional relativo a un Servicio específico cuando inicias sesión o comienzas a utilizar dicho Servicio.
            </Typography>
          </section>
          <section id="quejas">
            <Typography type="display1" paragraph className={classes.title}>
              9. Quejas relativas al contenido
            </Typography>
            <Typography type="body1" paragraph>
              Respetamos los derechos de propiedad intelectual de otras personas. Exigimos que la información publicada por los miembros sea exacta y que no infrinja los derechos de propiedad intelectual u otros derechos de terceros. Tenemos una política y un procedimiento para presentar quejas sobre el contenido publicado por nuestros Miembros.
            </Typography>
          </section>
          <section id="contactarnos">
            <Typography type="display1" paragraph className={classes.title}>
              10. Cómo contactarnos
            </Typography>
            <Typography type="body1" paragraph>
              Si quieres enviarnos avisos sobre un procedimiento específico, contáctanos en la siguiente dirección:
            </Typography>
            <Typography type="body1" paragraph>
              POR INTERNET
            </Typography>
            <Typography type="body1" paragraph>
              O POR CORREO POSTAL
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

Terms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Terms);
