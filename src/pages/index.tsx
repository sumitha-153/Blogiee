import styles from './index.module.css'
import Image from 'next/image';
import { useRouter } from 'next/router';
const GreetUser = () => {
    const router=useRouter()

    const HandleClick=()=>{
        router.push('/auth/signin')

    }
    return (

        
          <div className={styles.logo}>
          <Image className={styles.image} src="/logo.jpg" alt="logo" width={25} height={25} />
           <b className={styles.title}>BLOGIEE</b> <br />
           <p className={styles.des}>
            Explore the latest tech trends, insights and expert opinion. <br />
             Enhance your skills and fuel your curiosity <br />
             Stay Updated, Stay ahead!!
           </p>
           <button className={styles.button} onClick={HandleClick}>Start Exploring</button>

          </div>
        

    );
};

export default GreetUser;

