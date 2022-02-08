import { ExplorePage, HomePage } from '../../post/pages';
import CreatePost from '../../post/pages/create-post.page';
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
  {
    path: '/home',
    type: 'private',
    Element: HomePage,
  },
  {
    path: '/explore',
    type: 'private',
    Element: ExplorePage,
  },
  {
    path: '/create-post',
    type: 'private',
    Element: CreatePost,
  },
];

export default routes;
