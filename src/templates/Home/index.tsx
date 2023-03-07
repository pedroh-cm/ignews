import Head from 'next/head';
import { SubscribeButton } from '../../components/SubscribeButton';

import styles from './styles.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export function Home({ product }: HomeProps) {
  return (
    <>
     <Head>
       <title>Home | ig.news</title>
     </Head>
     
     <section className={styles.contentContainer}>
       <div className={styles.hero}>
         <span>👏 Hey, welcome</span>
         <h1>News about the <span>React</span> world.</h1>
         <p>
           Get acess to all the publications <br />
           <span>for {product.amount} month</span>
         </p>

         <SubscribeButton priceId={product.priceId} />
       </div>
 
       <img src="/images/avatar.svg" alt="Girl coding" />
     </section>
    </>
   )
  
}