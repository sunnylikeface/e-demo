/**
 *
 *  @auth xlx_good@qq.com
 *  @date 18/5/22.
 *
 */
var vm = new Vue({
    el: '#app',
    data: {
        loginName: '',
        loginPwd: '',
        error: null
    },
    methods: {
        login: function () {
            login({loginName: this.loginName, loginPwd: this.loginPwd}, function (resp) {
                if(resp.code=='000000'){
                    location.href = 'index.html';
                }else{
                    vm.error = resp.message;
                }
            })
        }
    }
});