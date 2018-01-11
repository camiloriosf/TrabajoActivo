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
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
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

class Index extends Component {
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
            Política de Cookies
          </Typography>
          <Typography type="subheading" paragraph>
            En TrabajoActivo, creemos que hay que ser claros sobre el modo en que recabamos y utilizamos tus datos. Para ofrecer un mayor nivel de transparencia, esta política proporciona información detallada sobre cómo y cuándo utilizamos cookies. Esta Política de cookies se aplica a cualquier producto o servicio de TrabajoActivo asociado a esta política o que la incorpore por referencia.
          </Typography>
          <Divider className={classes.divider} />
          <section id="main">
            <Typography type="display1" paragraph className={classes.title}>
              ¿Utiliza TrabajoActivo cookies?
            </Typography>
            <Typography type="body1" paragraph>
              Sí. Como se describe en la cláusula 1.4 de nuestra Política de privacidad, utilizamos cookies y otras tecnologías para garantizar que todos los usuarios de TrabajoActivo tengan la mejor experiencia posible. Las cookies también nos ayudan a mantener la seguridad de las cuentas. Cuando continúas visitando o utilizando nuestros servicios, estás aceptando el uso de cookies y de tecnologías similares para los fines descritos en esta política.
            </Typography>
            <Typography type="display1" paragraph className={classes.title}>
              ¿Qué es una cookie?
            </Typography>
            <Typography type="body1" paragraph>
              Una cookie es un pequeño archivo colocado en tu dispositivo electrónico que habilita las funcionalidades de TrabajoActivo. Por ejemplo, las cookies nos permiten identificar tu dispositivo, asegurar tu acceso a TrabajoActivo y a nuestros sitios en general, e incluso nos ayudan a saber cuando alguien intenta acceder a tu cuenta desde otro dispositivo. Las cookies también te permiten compartir contenidos con facilidad en TrabajoActivo y nos ayudan a mostrarte anuncios relevantes para ti.
            </Typography>
            <Typography type="display1" paragraph className={classes.title}>
              ¿Cuándo coloca TrabajoActivo cookies?
            </Typography>
            <Typography type="body1" paragraph>
              Utilizamos cookies en nuestros sitios web y en las aplicaciones móviles. Cualquier navegador que visite estos sitios web recibirá cookies nuestras. También colocamos cookies en tu navegador cuando visitas sitios que no son de TrabajoActivo pero que albergan nuestros complementos.
            </Typography>
            <Typography type="display1" paragraph className={classes.title}>
              ¿Qué tipo de cookies utiliza TrabajoActivo?
            </Typography>
            <Typography type="body1" paragraph>
              Utilizamos dos tipos: las cookies permanentes y las cookies de sesión. Una cookie permanente nos ayuda a reconocerte como usuario, de modo que te resultará más sencillo regresar a TrabajoActivo o interaccionar con nuestros servicios sin necesidad de volver a iniciar sesión. Una vez que hayas iniciado sesión, una cookie permanente permanecerá en tu navegador y TrabajoActivo la leerá cuando regreses a alguno de nuestros sitios web o a sitios de socios que utilizan nuestros servicios. Las cookies de sesión solo duran una sesión (normalmente la visita a un sitio web o una sesión del navegador).
            </Typography>
            <Typography type="display1" paragraph className={classes.title}>
              ¿Qué entidades de TrabajoActivo utilizan cookies?
            </Typography>
            <Typography type="body1" paragraph>
              Independiente de donde residas, BitterSweet SpA será la entidad responsable de controlar la información personal que reúna o que hayas proporcionado por o para nuestros Servicios.
            </Typography>
            <Typography type="display1" paragraph className={classes.title}>
              ¿Para qué se utilizan las cookies?
            </Typography>
            <Typography type="body1" paragraph>
              Las cookies pueden utilizarse para reconocerte cuando visitas TrabajoActivo, recordar tus preferencias y ofrecerte una experiencia personalizada basada en tu configuración. Las cookies también permiten que tus interacciones en TrabajoActivo sean más rápidas y seguras. Además, las cookies nos permiten mostrarte publicidad dentro y fuera de los sitios web de TrabajoActivo, y te ofrecen funcionalidades personalizadas a través de los complementos de TrabajoActivo.
            </Typography>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Categorías de uso</TableCell>
                  <TableCell>Descripción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Autenticación:</TableCell>
                  <TableCell>Si has iniciado sesión en TrabajoActivo, las cookies nos ayudan a mostrarte la información adecuada y a personalizar tu experiencia.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Seguridad:</TableCell>
                  <TableCell>Utilizamos cookies para activar y respaldar nuestras funcionalidades de seguridad, y para ayudarnos a detectar actividades fraudulentas e infracciones de nuestras Condiciones de uso.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Preferencias, funcionalidades y servicios:</TableCell>
                  <TableCell>Las cookies pueden decirnos qué idiomas prefieres y cuáles son tus preferencias de comunicación. Pueden ayudarte a rellenar formularios en TrabajoActivo con mayor facilidad. También te proporcionan funcionalidades, información y contenidos personalizados conjuntamente con nuestros complementos. Puedes obtener más información sobre los complementos en nuestra Política de privacidad.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Publicidad:</TableCell>
                  <TableCell>Podemos usar las cookies para mostrarte publicidad relevante tanto dentro como fuera de los sitios web de TrabajoActivo. También podemos usar una cookie para saber si alguien que vio un anuncio, lo visitó en otro momento y realizó una acción (como descargar un documento o hacer una compra) en el sitio web del anunciante. Asimismo, nuestros socios pueden usar una cookie para determinar si hemos mostrado un anuncio y qué resultados obtuvo, o para proporcionarnos información sobre cómo interaccionas con ellos. También podemos colaborar con un socio para mostrarte un anuncio dentro o fuera de los sitios web de TrabajoActivo, como después de haber visitado el sitio web de un socio o una aplicación.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rendimiento, análisis e investigación:</TableCell>
                  <TableCell>Las cookies nos ayudan a averiguar el rendimiento de nuestros sitios web y de los complementos en lugares diferentes. También usamos cookies para comprender, mejorar e investigar productos, funcionalidades y servicios, incluso cuando accedes a TrabajoActivo desde otros sitios web, aplicaciones o dispositivos como tu ordenador del trabajo o tu teléfono móvil.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography type="display1" paragraph className={classes.title}>
              ¿Qué es «Do Not Track» (DNT)?
            </Typography>
            <Typography type="body1" paragraph>
              «Do Not Track» (DNT) es un concepto que ha sido promovido por las autoridades reguladoras estadounidenses, en particular por la Comisión Federal de Comercio de EE. UU. para el sector de Internet a fin de desarrollar e implementar un mecanismo que permita a los internautas controlar el seguimiento o rastreo que se realiza de sus actividades en línea en los distintos sitio web a través de la configuración de sus navegadores. El Consorcio World Wide Web (W3C) ha trabajado con grupos del sector, con navegadores de Internet, con empresas de tecnología y con organismos reguladores para desarrollar un estándar de tecnología DNT. Aunque se han realizado algunos avances, han sido escasos. Hasta la fecha no se ha adoptado ninguna norma al respecto. Como tal, TrabajoActivo no utiliza señales de «no rastreo».
            </Typography>
            <Typography type="display1" paragraph className={classes.title}>
              ¿Cómo se utilizan las cookies para fines publicitarios?
            </Typography>
            <Typography type="body1" paragraph>
              Las cookies y las tecnologías publicitarias como las balizas, los píxeles y las etiquetas nos ayudan a mostrarte anuncios relevantes con mayor eficacia. También nos ayudan a recoger información agregada, investigaciones e informes para los anunciantes, a comprender y mejorar nuestro servicio, y a saber cuándo has visto un contenido. Nota: Dado que tu navegador puede solicitar estos anuncios y balizas directamente a los servidores de redes publicitarias, estas redes pueden ver, editar o establecer sus propias cookies como si hubieras solicitado ver una pagina web de su sitio. Los anuncios en TrabajoActivo también pueden incluir cookies de terceros.
            </Typography>
            <Typography type="body1" paragraph>
              Si inicias sesión en TrabajoActivo.com o en otro Servicio al que se hace referencia en esta Política de cookies, o si visitas el sitio web de un tercero que es socio de TrabajoActivo y una de nuestras cookies en tu dispositivo te identifica, identifica tu uso (como tu conducta de navegación) y los datos de los logs (como tu dirección de IP), se asociarán a tu cuenta tal y como se describe en la cláusula 1.3 de nuestra Política de privacidad. También usamos los datos agregados de terceros, los datos de tu perfil y tu actividad de TrabajoActivo.
            </Typography>
            <Typography type="body1" paragraph>
              Si eres miembro de TrabajoActivo pero no has iniciado sesión en tu cuenta en un navegador, TrabajoActivo puede continuar registrando tus interacciones con nuestros servicios en ese navegador durante 30 días para generar análisis de uso dirigido a nuestros servicios, que podremos compartir de manera agregada con nuestros clientes de publicidad.
            </Typography>
            <Typography type="body1" paragraph>
              Salvo que elimines estas cookies de tu navegador, podremos utilizar esta información para:
            </Typography>
            <Typography type="body1" paragraph>
              • Proporcionarte publicidad más relevante basada en tus intereses.
            </Typography>
            <Typography type="body1" paragraph>
              • Generar informes agregados de la actividad publicitaria para los anunciantes y sitios web que albergan los anuncios.
            </Typography>
            <Typography type="body1" paragraph>
              • Ayudar a los propietarios de sitios web y de aplicaciones a comprender cómo interaccionan los visitantes con sus sitios web o aplicaciones.
            </Typography>
            <Typography type="body1" paragraph>
              • Detectar, defender y proteger de situaciones de fraude y de otros riesgos a los usuarios y a los socios.
            </Typography>
            <Typography type="body1" paragraph>
              • Mejorar nuestros productos.
            </Typography>
            <Typography type="body1" paragraph>
              No proporcionamos la información personal que recabamos a los anunciantes salvo que nos autorices a hacerlo. Puedes autoexcluirte de ver publicidad de nuestros clientes personalizada en función de tus intereses, así como de la publicidad de nuestros clientes basada en la información recopilada de sitios web de terceros ajustando tu configuración. Ten en cuenta que la autoexclusión no eliminará la publicidad de las páginas que visites; significa que los anuncios que veas podrán no coincidir con tus intereses. Si no eres miembro de TrabajoActivo, obtén más información sobre las cookies y cómo autoexcluirte.
            </Typography>
            <Typography type="display1" paragraph className={classes.title}>
              ¿Qué cookies de terceros utiliza TrabajoActivo?
            </Typography>
            <Typography type="body1" paragraph>
              Nuestro gráfico de cookies enumera algunas de las cookies de terceros que tenemos en nuestros sitios web. Ten en cuenta que los nombres de las cookies, píxeles y otras tecnologías pueden cambiar con el tiempo. Ten en cuenta también que las empresas y otro tipo de organizaciones que patrocinan páginas en TrabajoActivo pueden usar cookies, píxeles o otras tecnologías en sus páginas de TrabajoActivo para analizar tu interés en ellos.
            </Typography>
            <Typography type="display1" paragraph className={classes.title}>
              Control de las cookies
            </Typography>
            <Typography type="body1" paragraph>
              La mayoría de los navegadores te permiten controlar las cookies a través de sus preferencias de configuración. No obstante, si limitas la posibilidad de que los sitios web establezcan cookies, puedes empeorar tu experiencia general de usuario, ya que no será personalizada. Es posible que no puedas guardar configuraciones personalizadas como tu información de inicio de sesión.
            </Typography>
            <Typography type="display1" paragraph className={classes.title}>
              ¿Qué hacer si no quieres tener cookies o quieres eliminarlas?
            </Typography>
            <Typography type="body1" paragraph>
              Si no quieres que utilicemos cookies cuando visitas TrabajoActivo, puedes autoexcluirte de algunas de ellas en tu página de configuración. Para que nosotros sepamos que has marcado la opción de autoexclusión, tenemos que establecer esta opción en tu dispositivo electrónico para no colocar otras cookies de TrabajoActivo la próxima vez que visites el sitio web. Si no quieres recibir cookies, también puedes cambiar la configuración de tu navegador en tu ordenador u otro dispositivo electrónico que estés usando para acceder a nuestros servicios. Si usas TrabajoActivo sin cambiar la configuración de tu navegador, deduciremos que deseas recibir cookies del sitio web de TrabajoActivo. La mayoría de los navegadores también te ofrecen la opción de revisar y de eliminar las cookies, incluidas las de TrabajoActivo. Ten en cuenta que el sitio web de TrabajoActivo no funcionará correctamente sin las cookies.
            </Typography>
            <Typography type="body1" paragraph>
              Para averiguar más sobre las cookies, incluidas las cookies que han sido establecidas y cómo gestionarlas y borrarlas, visita <Link href="https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)"><a>wikipedia.org</a></Link>, <Link href="http://www.allaboutcookies.org//es/"><a>www.allaboutcookies.org</a></Link>, o <Link href="http://www.aboutcookies.org/"><a>www.aboutcookies.org</a></Link>.
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

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
