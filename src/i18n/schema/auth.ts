import type { I18nSchema } from '../config'

export const authSchema: I18nSchema = {
  signIn:{
    value:'Sign in',
    description:'auth login text'
  },
  signUp:{
    value:'Sign up',
    description:'auth sign up text'
  },
  createAccount:{
    value:'Create account',
    description:'auth login title'
  },
  email:{
    value:'Email',
    description:'email text'
  },
  password:{
    value:'Password',
    description:'password text'
  },
  threePartyLogin:{
    google:{
      value:'{loginText} with Google',
      description:'google login text'
    },
    github:{
      value:'{loginText} with Github',
      description:'github login text'
    },
    wallet:{
      value:'{loginText} with Metamask',
      description:'wallet login text'
    },
  },
  haveAccount:{
    value:'Already have an account',
    description:'already have an account'
  },
  welcome:{
    value:'Welcome to HackQuest',
    description:'welcome text'
  },
  inviteCode:{
    value:'Invite Code',
    description:'invite code text'
  },
  verifyText:{
    lowercaseCharacters:{
      value:'Lowercase characters',
      description:'lowercase characters text'
    },
    uppercaseCharacters:{
      value:'Uppercase characters',
      description:'uppercase characters text'
    },
    numbers:{
      value:'Numbers',
      description:'numbers text'
    },
    charactersMinimum:{
      value:'8 characters minimum',
      description:'8 characters minimum text'
    },
    passwordFormatError:{
      value:'Password format error',
      description:'password format error text'
    },
    inviteCodeEmptyError:{
      value:'Please enter your invite code',
      description:'invite code empty error text'
    },
    verifyEmail:{
      value:'Verify your Email',
      description:'verify your email text'
    },
    verifyEmailTips:{
      value:'Please verify via the link in the email and follow the instruction to login',
      description:'verify email tips text'
    },
    success:{
      value:'You’re all set',
      description:'verify success text'
    },
    successTips:{
      value:'Welcome to HackQuest! Your Web3 journey will start from here',
      description:'verify success tips text'
    },
    fail:{
      value:'Unable to verify',
      description:'verify fail text'
    },
    failTips:{
      value:'Your verification has failed! Please try again.',
      description:'verify fail tips text'
    }
  },
  haveInviteCode:{
    value:'I have an invite code',
    description:'have invite code text'
  },
  continueTips:{
    value:'By clicking continue, you agree to HackQuest’s Terms and Privacy Policy',
    description:'continue tips text'
  },
  resendLink:{
    value:'Resend link',
    description:'resend link text'
  },
  sendLink:{
    value:'Send link',
    description:'send link text'
  },
  changeEmail:{
    value:'Change Email',
    description:'change email text'
  },
  exploreWeb3:{
    value:'Explore Web3',
    description:'explore web3 text'
  },
  forgetPassword:{
    value:'Forget Password',
    description:'forget password text'
  },
  forgetPasswordTips:{
    value:'We will send a link to your email to reset password',
    description:'forget password tips text'
  },
  newPassword:{
    value:'New Password',
    description:'new password text'
  },
  resetPassword:{
    value:'Reset Password',
    description:'reset password text'
  },
  resetPasswordSuccess:{
    value:'Password successfully reset',
    description:'reset password success text'
  },
  resetPasswordSuccessTips:{
    value:'Please sign in with your new password',
    description:'reset password success tips text'
  },
  newHackquest:{
    value:'New to HackQuest',
    description:'new hackquest text'
  },
  hasRegistered:{
    value:'Email registered',
    description:'email registered text'
  },
  reset:{
    value:'Reset',
    description:'reset text'
  },
  continueLogin:{
    value:'Continue login',
    description:'continue login text'
  }
}
