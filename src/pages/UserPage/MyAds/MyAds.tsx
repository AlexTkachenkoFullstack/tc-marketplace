import React, {useState, useEffect} from 'react';
import styles from './MyAds.module.scss';
import axios, { AxiosError } from 'axios';

import ActiveCard from './Card/ActiveCard';
import PendingCard from './Card/PendingCard';
import DeactivatedCard from './Card/DeactivatedCard';
import DeletedCard from './Card/DeletedCard';
import { useAppSelector } from 'redux/hooks';
import { getToken } from 'redux/auth/selectors';
import { IAd } from 'types/IAd';

enum Tab {
  active,
  pending,
  deactivated,
  deleted,
}

type KnownError = {
  errorMessage: string;
};

const instance = axios.create({
  baseURL: 'http://api.pawo.space/api/v1/user-page/my-transports/',
});

const setAuthHeader = (token:string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};


const MyAds: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.active);
  const [activeCars, setActiveCars]=useState<IAd[] | []>([]);
  const [deletedCars, setDeletedCars]=useState<IAd[] | []>([]);
  const [pendingCars, setPendingCars]=useState<IAd[] | []>([]);
  const [inactiveCars, setInactiveCars]=useState<IAd[] | []>([])
  const token=useAppSelector(getToken)

  useEffect(()=>{
    const fetchStatusCars=async()=>{
      if(!token){
        return
      }
      try{
        setAuthHeader(token)
      const {data:activeCars}=await instance('active')
      const {data:deletedCars}=await instance('deleted')
      const {data:pendingCars}=await instance('pending')
      const {data:inactiveCars}=await instance('inactive')
      setActiveCars(activeCars)
      setDeletedCars(deletedCars)
      setPendingCars(pendingCars)
      setInactiveCars(inactiveCars)
      }catch (err) {
        const error: AxiosError<KnownError> = err as any;
        console.log(error.message)
      }
    }
    fetchStatusCars()
  },[token])
 

  const renderTabContent = () => {
    switch (activeTab) {
      case Tab.active:
        return <ActiveCard cars={activeCars}/>;
      case Tab.pending:
        return <PendingCard cars={pendingCars}/>;
      case Tab.deactivated:
        return <DeactivatedCard cars={inactiveCars}/>;
      case Tab.deleted:
        return <DeletedCard cars={deletedCars}/>;
      default:
        return null;
    }
  }
  return (
    <div className={styles.MyAds}>
      <div className={styles.container}>
        <div className={styles.MyAds_statusTabs}>
        <div className={styles.tabs}>
            <button className={`${styles.tab} ${activeTab === Tab.active ? styles.active : ''}`} onClick={() => setActiveTab(Tab.active)}>Активні {activeCars ? <span className={styles.count}>{activeCars.length}</span> : ''}</button>
            <button className={`${styles.tab} ${activeTab === Tab.pending ? styles.active : ''}`} onClick={() => setActiveTab(Tab.pending)}>В очікуванні {pendingCars  ? <span className={styles.count}>{ pendingCars.length }</span> : ''}</button>
            <button className={`${styles.tab} ${activeTab === Tab.deactivated ? styles.active : ''}`} onClick={() => setActiveTab(Tab.deactivated)}>Деактивовані {inactiveCars ? <span className={styles.count}>{inactiveCars.length}</span> : ''}</button>
            <button className={`${styles.tab} ${activeTab === Tab.deleted ? styles.active : ''}`} onClick={() => setActiveTab(Tab.deleted)}>Видалені {deletedCars ? <span className={styles.count}>{deletedCars.length}</span> : ''}</button>
        </div>
        <div className={styles.tabContent}>{renderTabContent()}</div>
        </div>
        
      </div>
    </div>
  );
};

export default MyAds;