import styles from './AppLayout.module.css';
import {SideBar} from '../../components/SideBar/SideBar.jsx';
import {Map} from '../../components/Map/Map.jsx';

export function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar/>
      <Map/>
    </div>
  );
}