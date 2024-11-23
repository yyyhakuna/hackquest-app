import type { I18nSchema } from '../config'

export const faucetsScheme: I18nSchema = {
  title: {
    value: 'Free Testnet Faucet',
    description: 'faucet title',
  },
  description: {
    value: 'Access complimentary testnet funds across various blockchains for developing your upcoming project.',
    description: 'faucet description',
  },
  faucetFaq: {
    title: {
      value: 'Frequently Asked Questions',
      description: 'faucet footer title',
    },
    question1: {
      problem: {
        value: 'What is a faucet?',
        description: 'first question title',
      },
      answer: {
        value:
          "A testnet faucet in Web3 is a service that provides users with free cryptocurrency tokens for testing purposes on a blockchain's test network. It allows developers and users to experiment with blockchain applications without using real funds.",
        description: 'first question answer',
      },
    },
    question2: {
      problem: {
        value: 'How much test token can I claim one time?',
        description: 'second question title',
      },
      answer: {
        value:
          "It depends on the testnet gas fee and how many test tokens we have in store. Typically, it's more than enough for you to deploy one contract on testnet. If you need more, you can come back and claim again after 24 hours.",
        description: 'second question answer',
      },
    },
    question3: {
      problem: {
        value: 'How long will it take to receive test tokens?',
        description: 'third question title',
      },
      answer: {
        value:
          'The time required to receive the testnet tokens is contingent upon the network chosen. Typically, the process should conclude within a matter of minutes, with instances of completion occurring in mere seconds being commonplace.',
        description: 'third question answer',
      },
    },
  },
  wantToDonate: {
    value: 'Want to donate to our faucet?',
    description: 'donate card title ',
  },
  donate: {
    value: 'Send {symbol} to {address}',
    description: 'donate card content',
  },
}
