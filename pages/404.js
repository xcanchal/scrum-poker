import { httpErrors } from '../constants/api';
import ErrorComponent from '../components/error';

export default function Custom404() {
  return <ErrorComponent code={httpErrors.notFound} />;
}
