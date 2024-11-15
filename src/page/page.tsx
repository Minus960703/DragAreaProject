import { Aside, ElementLayout } from 'components';
import { ElementStateProvider } from 'context';

function HomePage() {
  return (
    <main>
      <ElementStateProvider>
        <Aside />
        <ElementLayout />
      </ElementStateProvider>
    </main>
  )
}

export default HomePage;