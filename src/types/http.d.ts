export {} // make this file as a module https://blog.csdn.net/HermitSun/article/details/104104762

declare global {
  // /api/user/checkLogin 查看登录状态
  interface checkLoginResponse {
    data: { 
      login: boolean,
      state: boolean,
      username: null | string
    }
  } 
}
