import {
  LoginPage,
  SignUpPage,
  VerifyEmailPage,
  VerifyEmailConfirmPage,
  ResetPasswordPage,
  ResetPasswordConfirmPage,
} from '../../user/pages';

interface Route {
  path: string;
  type: 'private' | 'protected' | 'protected';
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
    type: 'protected',
    Element: VerifyEmailPage,
  },
  {
    path: '/verify-email/:userId/:token',
    type: 'protected',
    Element: VerifyEmailConfirmPage,
  },
  {
    path: '/reset-password',
    type: 'protected',
    Element: ResetPasswordPage,
  },
  {
    path: '/reset-password/:userId/:token',
    type: 'protected',
    Element: ResetPasswordConfirmPage,
  },
];

export default routes;
