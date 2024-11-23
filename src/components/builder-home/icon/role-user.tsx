import type React from 'react'

interface BaseIconProps {
  size?: number
  color?: string
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>

const RoleUserIcon: React.FC<IconProps> = props => {
  const { size = 32, color = 'hsl(var(--neutral-800))' } = props

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d="M2.86956 21.0268C3.706 21.7231 4.87006 22.1063 6.14712 22.1063C8.92887 22.1063 10.8715 20.3578 10.8715 17.8541C10.8715 17.6071 10.6881 17.3986 10.4433 17.3666L6.85952 7.7591H14.2189C14.4865 8.47685 15.0983 9.01079 15.8453 9.17904V22.1503H14.7743C13.6195 22.1503 12.6525 23.0113 12.4249 24.0568H12.2301C11.9522 24.0646 11.7298 24.2895 11.7249 24.5673V26.7936C11.7249 27.0653 11.9586 27.2548 12.2303 27.2548H20.4447C20.7164 27.2548 20.9501 27.0651 20.9501 26.7936V24.5673C20.9452 24.2895 20.7225 24.0644 20.4447 24.0568H20.2499C20.0223 23.0113 19.0556 22.1503 17.9005 22.1503H16.8297V9.17904C17.5767 9.01082 18.1886 8.47691 18.4561 7.7591H25.8155L22.2317 17.3666C21.9869 17.3986 21.8038 17.6071 21.8035 17.8541C21.8035 19.1583 22.2935 20.2555 23.2203 21.0268C24.0567 21.7231 25.2208 22.1063 26.4978 22.1063C29.2796 22.1063 31.2222 20.3578 31.2222 17.8541C31.2222 17.6193 31.0562 17.4171 30.826 17.3715L26.989 7.08523C26.9871 7.0801 26.9846 7.07546 26.9829 7.07034C26.9795 7.06228 26.9763 7.05398 26.9724 7.04617C26.9688 7.03835 26.9651 7.03152 26.9612 7.02444C26.9573 7.01736 26.9539 7.01101 26.95 7.00417C26.9461 6.99758 26.9407 6.98952 26.9358 6.9822C26.9317 6.9761 26.9278 6.96999 26.9236 6.96438C26.9185 6.95754 26.9131 6.95071 26.9077 6.94411C26.9024 6.93752 26.898 6.9324 26.8928 6.92678C26.8877 6.92117 26.8819 6.91506 26.8762 6.90945C26.8706 6.90383 26.8645 6.89797 26.8584 6.89236C26.8523 6.88674 26.8474 6.88284 26.8418 6.8782C26.835 6.87258 26.8281 6.86697 26.8208 6.8616C26.8152 6.85745 26.8096 6.85354 26.8037 6.84963C26.7962 6.84451 26.7886 6.83962 26.7808 6.83498C26.7747 6.83132 26.7686 6.8279 26.7622 6.82449C26.7544 6.82034 26.7468 6.81618 26.7388 6.81228C26.7317 6.80886 26.7244 6.80617 26.7171 6.80276C26.7114 6.80032 26.7061 6.79763 26.7005 6.79568C26.6983 6.79494 26.6963 6.79446 26.6944 6.79372C26.6865 6.79104 26.6787 6.7886 26.6709 6.7864C26.6631 6.78396 26.6553 6.78152 26.6475 6.77956C26.6397 6.77761 26.6328 6.77639 26.6253 6.77492C26.6167 6.77322 26.6084 6.77126 26.5999 6.77004C26.593 6.76907 26.586 6.76858 26.5791 6.76784C26.5701 6.76687 26.5611 6.76589 26.552 6.7654C26.5452 6.76492 26.5381 6.7654 26.5313 6.7654H26.5042C26.4971 6.76589 26.4898 6.76687 26.4824 6.76736C26.4736 6.76809 26.4651 6.76882 26.4563 6.77004C26.449 6.77102 26.4417 6.77273 26.4343 6.77419H26.4329L18.5879 6.77468C18.521 6.01762 18.0781 5.34499 17.4094 4.98462C16.7405 4.62427 15.9351 4.62427 15.2664 4.98462C14.5974 5.34497 14.1546 6.01756 14.0879 6.77468H6.24294C6.23488 6.77297 6.22683 6.77126 6.21877 6.77004C6.21193 6.76907 6.2051 6.76858 6.19802 6.76784C6.18898 6.76687 6.17995 6.76589 6.17092 6.7654C6.16408 6.76492 6.157 6.7654 6.15017 6.7654H6.12307C6.11599 6.76589 6.10866 6.76687 6.10158 6.76736C6.09279 6.76809 6.08425 6.76882 6.07546 6.77004C6.06814 6.77102 6.06081 6.77273 6.05349 6.77419C6.04494 6.7759 6.0364 6.77737 6.0281 6.77956C6.02102 6.78127 6.01394 6.78371 6.00686 6.78567C5.99831 6.78835 5.98977 6.79079 5.98147 6.79372C5.97951 6.79446 5.97756 6.79494 5.97536 6.79568C5.96999 6.79763 5.96486 6.80032 5.95949 6.80251C5.95193 6.80569 5.94436 6.80862 5.93679 6.81228C5.92946 6.81594 5.92141 6.82009 5.91384 6.82424C5.90774 6.82766 5.90114 6.83108 5.8948 6.83474C5.88698 6.83938 5.87942 6.84451 5.87185 6.84939C5.86623 6.8533 5.86037 6.8572 5.85476 6.86135C5.84768 6.86672 5.8406 6.87209 5.83376 6.87795C5.82815 6.88259 5.82253 6.88723 5.81716 6.89211C5.81179 6.897 5.80495 6.90359 5.79909 6.90945C5.79348 6.91531 5.78811 6.92068 5.78274 6.92654C5.77736 6.9324 5.77248 6.93826 5.7676 6.94412C5.76272 6.94997 5.75686 6.95705 5.75197 6.96389C5.74685 6.97073 5.74343 6.9761 5.73928 6.98245C5.73464 6.98953 5.72976 6.99661 5.72536 7.00393C5.72097 7.01126 5.71755 7.0176 5.71389 7.02444C5.71023 7.03127 5.70632 7.0386 5.7029 7.04592C5.69948 7.05325 5.69582 7.06228 5.6924 7.07058C5.69045 7.07546 5.68801 7.08035 5.6863 7.08523L1.84936 17.3715C1.61914 17.4171 1.45312 17.6193 1.45312 17.8541C1.45312 19.1583 1.94311 20.2553 2.86987 21.0268L2.86956 21.0268ZM26.4977 21.1178C25.4503 21.1178 24.5099 20.8131 23.8497 20.2636C23.2719 19.7829 22.9208 19.1366 22.8187 18.3371H30.2069C29.9539 20.2436 28.2186 21.1178 26.4981 21.1178H26.4977ZM26.528 8.65596L29.7723 17.3535H23.2842L26.528 8.65596ZM19.9661 25.041V26.271H12.7092V25.041H19.9661ZM17.9006 23.1345C18.5086 23.1345 19.0281 23.5649 19.2283 24.0571L13.447 24.0568C13.6472 23.5649 14.1665 23.1342 14.7746 23.1342L17.9006 23.1345ZM16.3376 5.69946C16.6758 5.6997 16.9998 5.83422 17.2388 6.07324C17.478 6.31225 17.6126 6.63647 17.6128 6.97462C17.6128 7.00757 17.6104 7.04005 17.6079 7.07252C17.5813 7.13404 17.5674 7.20045 17.5676 7.26758C17.5676 7.27857 17.5686 7.28931 17.5693 7.30005C17.4876 7.60865 17.2932 7.87525 17.0247 8.04737C16.7559 8.21949 16.4324 8.28443 16.1182 8.22974C15.8037 8.17481 15.5212 8.00415 15.3267 7.75123C15.1321 7.49854 15.0396 7.18165 15.0671 6.86379C15.0947 6.54592 15.2405 6.25002 15.4756 6.03442C15.7109 5.81884 16.0186 5.69922 16.3376 5.69946ZM6.14702 8.65646L9.3914 17.354H2.90265L6.14702 8.65646ZM9.85602 18.3377C9.60285 20.2442 7.86777 21.1185 6.14727 21.1185C5.0999 21.1185 4.15946 20.8138 3.49934 20.2642C2.92145 19.7835 2.57015 19.1373 2.46809 18.3377H9.85602Z"
        fill={color}
      />
    </svg>
  )
}
export default RoleUserIcon
