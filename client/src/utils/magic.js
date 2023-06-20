import { Magic } from 'magic-sdk';
const VITE_APP_MAGIC_PUBLISHABLE_KEY = import.meta.env.VITE_APP_MAGIC_PUBLISHABLE_KEY;

const magic = new Magic(VITE_APP_MAGIC_PUBLISHABLE_KEY);

export default magic;