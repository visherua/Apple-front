import StartingPageContent from '../components/starting-page/starting-page';
import { useRouter } from 'next/router';
function HomePage() {
  const router = useRouter();
  router.push('/projects')
  return <StartingPageContent />;
}

export default HomePage;