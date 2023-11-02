 "use client"
import { useRouter } from 'next/navigation';
import Button from './Button'

type Props = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const LoadMore = ( { startCursor, endCursor, hasNextPage, hasPreviousPage } : Props) => {

  const router = useRouter();

  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if(direction === 'next' && hasNextPage) {
      currentParams.delete('startcursor');
      currentParams.set('endcursor', endCursor);
    } else if (direction === 'previous' && hasPreviousPage){
      currentParams.delete('endcursor');
       currentParams.set('startcursor', startCursor);
    }

    const newSearchParams = currentParams.toString();
    const newUrl = `${window.location.pathname}?${newSearchParams}`;

    router.push(newUrl);
  }

  return (
    <div className='w-full flexCenter gap-5 mt-10'>
      {hasPreviousPage && (
        <Button
          title="Previous" handleClick={()=> handleNavigation('previous')}
        />
      )}
      {hasNextPage && (
        <Button
          title="Next" handleClick={()=> handleNavigation('next')}
        />
      )}
    </div>
    
  )
}

export default LoadMore