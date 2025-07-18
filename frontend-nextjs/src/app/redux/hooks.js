import { useSelector, useDispatch } from 'react-redux';
import { loginAdmin, logoutAdmin } from './slices/AuthSlices';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { admin, token, status, error } = useSelector((state) => state.auth);

    return {
        admin,
        token,
        isLoading: status === 'loading',
        isAuthenticated: !!token,
        error,

        // Actions
        login: (credentials) => dispatch(loginAdmin(credentials)),
        logout: () => dispatch(logoutAdmin()),
    };
};
