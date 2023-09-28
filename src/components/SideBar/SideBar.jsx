import styles from './Sidebar.module.css';
import Logo from '../Logo/Logo.jsx';
import {AppNav} from '../AppNav/AppNav.jsx';
import {Footer} from '../Footer/Footer.jsx';


export function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo/>
      <AppNav/>
      <p>List of cities</p>
      <Footer/>
    </div>
  );
}