import {
  LoginPage,
  SignUpPage,
  VerifyEmailPage,
  VerifyEmailConfirmPage,
} from '../../user/pages';

interface Route {
  path: string;
  type: 'private' | 'protected' | 'public';
  Element: () => JSX.Element;
}

const routes: Route[] = [
  {
    path: '/sign-up',
    type: 'protected',
    Element: SignUpPage,
  },
  {
    path: '/login',
    type: 'protected',
    Element: LoginPage,
  },
  {
    path: '/verify-email',
    type: 'public',
    Element: VerifyEmailPage,
  },
  {
    path: '/verify-email/:token',
    type: 'public',
    Element: VerifyEmailConfirmPage,
  },
];

export default routes;
