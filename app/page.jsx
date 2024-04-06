import Image from "next/image";
import Card from '@components/Card';

export default function Home() {
  return (
    <main>
      <div className="mainPage">
        <div className='cardCriteria'>

        </div>
        <div className='cardContainer'>
          <Card />
        </div>
        
      </div>
      
    </main>
  );
}
