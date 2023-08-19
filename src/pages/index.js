import Image from 'next/image'
import { Inter } from 'next/font/google'
import { getAll } from '@/services/products'

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  const { products } = props;
  const productsList = products.map(product => {
    return (<li className='listproduct' key={product.id}>
      <div className='listproduct-main'>
      <span className="listproduct-main-date">Created on :{product.formattedDate}</span>
        <p>{product.title}</p>
        <div>{product.description}</div>

      </div>
    </li>)
  })
  return (
    <div>
      <main>
      <div className="morninglist">
            <h6>Good Morning Readers!</h6>
        </div>
        <div className="mainpagelist">
          {productsList}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const data = getAll();
  console.log(data);
  return {
    props: {
      title: "Hello",
      products: data
    }
  };

}