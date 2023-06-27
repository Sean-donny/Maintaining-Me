import { Outlet } from 'react-router-dom';
import HeaderTabs from '../Header';
import FooterSimple from '../Footer';

const AppLayout = () => {
  return (
    <>
      <HeaderTabs
        tabs={[
          { href: '/', title: 'Dashboard' },
          { href: '/diarystudio', title: 'Diary' },
          { href: '/awardstudio', title: 'Awards' },
          { href: '/exercisestudio', title: 'Exercise Studio' },
        ]}
      />
      <Outlet />
      <FooterSimple />
    </>
  );
};

export default AppLayout;
