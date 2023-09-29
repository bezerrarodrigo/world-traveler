import styles from './Sidebar.module.css';
import Logo from '../Logo/Logo.jsx';
import {AppNav} from '../AppNav/AppNav.jsx';
import {Footer} from '../Footer/Footer.jsx';
import {Outlet} from 'react-router-dom';


export function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo/>
      <AppNav/>
      <Outlet/>
      <Footer/>
    </div>
  );
}