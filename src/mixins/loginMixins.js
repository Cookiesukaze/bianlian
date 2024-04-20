// loginMixin.js
export default {
    data() {
        return {
            isLoggedIn: false,
            username: '',
        };
    },
    methods: {
        handleLoginSuccess(userData) {
            this.isLoggedIn = true;
            this.username = userData.username;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', userData.username);
        },
        logout() {
            this.isLoggedIn = false;
            this.username = '';
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
        },
        updateLoginStatus() {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            const username = localStorage.getItem('username');
            if (isLoggedIn === 'true') {
                this.isLoggedIn = true;
                this.username = username;
            }
        },
    },
    mounted() {
        this.updateLoginStatus();
    },
};
