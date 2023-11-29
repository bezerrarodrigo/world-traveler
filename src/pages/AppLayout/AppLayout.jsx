import styles from "./AppLayout.module.css";
import {SideBar} from "../../components/SideBar/SideBar.jsx";
import {Map} from "../../components/Map/Map.jsx";
import User from "../../components/User/User.jsx";

export function AppLayout() {
  return (
    <div className={styles.app}>
      <User/>
      <SideBar/>
      <Map/>
    </div>
  );
}