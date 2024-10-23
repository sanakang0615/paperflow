'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'

export function Logo({ className }) {
  let transition = {
    duration: 0.5,
    ease: 'easeInOut',
  }

  return (
    <motion.svg
      transform="translate(45, 0)"
      variants={{ idle: {}, active: {} }}
      initial="idle"
      whileHover="active"
      width={127}
      height={34}
      viewBox="0 0 127 34"
      className={clsx(className, 'overflow-visible')}
    >
      <motion.g
        variants={{
          idle: { scale: 1, opacity: 1 },
          active: {
            scale: [1, 1.15, 1],
            opacity: [1, 0.75, 1],
            transition: {
              ...transition,
              delay: 0,
            },
          },
        }}
      >
        <motion.path d="M19.5986 18.5005C18.7702 19.9354 16.9354 20.427 15.5005 19.5986C14.0656 18.7701 13.574 16.9354 14.4024 15.5005C15.2309 14.0656 17.0656 13.574 18.5005 14.4024C19.9354 15.2308 20.427 17.0656 19.5986 18.5005Z" />
      </motion.g>
      <motion.g
        variants={{
          idle: { scale: 1, opacity: 1 },
          active: {
            scale: [1, 1.1, 1],
            opacity: [1, 0.75, 1],
            transition: {
              ...transition,
              delay: 0.15,
            },
          },
        }}
      >
        <path d="M23.2324 10.2074C22.6801 11.1639 21.4569 11.4917 20.5003 10.9394C19.5437 10.3871 19.216 9.16395 19.7683 8.20736C20.3205 7.25078 21.5437 6.92303 22.5003 7.47531C23.4569 8.0276 23.7846 9.25078 23.2324 10.2074Z" />
        <path d="M19.7683 25.7933C19.216 24.8367 19.5437 23.6135 20.5003 23.0612C21.4569 22.5089 22.6801 22.8367 23.2324 23.7933C23.7847 24.7498 23.4569 25.973 22.5003 26.5253C21.5437 27.0776 20.3206 26.7498 19.7683 25.7933Z" />
        <path d="M26 19C24.8954 19 24 18.1046 24 17C24 15.8955 24.8954 15 26 15C27.1046 15 28 15.8955 28 17C28 18.1046 27.1046 19 26 19Z" />
        <path d="M14.2324 25.7933C13.6801 26.7499 12.4569 27.0777 11.5003 26.5254C10.5437 25.9731 10.216 24.7499 10.7683 23.7933C11.3205 22.8367 12.5437 22.509 13.5003 23.0613C14.4569 23.6136 14.7846 24.8367 14.2324 25.7933Z" />
        <path d="M10.7682 10.2073C10.216 9.25078 10.5437 8.0276 11.5003 7.47532C12.4569 6.92303 13.6801 7.25078 14.2323 8.20737C14.7846 9.16395 14.4569 10.3871 13.5003 10.9394C12.5437 11.4917 11.3205 11.1639 10.7682 10.2073Z" />
        <path d="M8 19C6.89543 19 6 18.1045 6 17C6 15.8954 6.89543 15 8 15C9.10457 15 10 15.8954 10 17C10 18.1045 9.10457 19 8 19Z" />
      </motion.g>
      <motion.g
        variants={{
          idle: { scale: 1, opacity: 1 },
          active: {
            scale: [1, 1.1, 1],
            opacity: [1, 0.75, 1],
            transition: {
              ...transition,
              delay: 0.3,
            },
          },
        }}
      >
        <path d="M25.8662 3.6447C25.5901 4.12299 24.9785 4.28686 24.5002 4.01072C24.0219 3.73458 23.858 3.12299 24.1342 2.6447C24.4103 2.1664 25.0219 2.00253 25.5002 2.27867C25.9785 2.55481 26.1424 3.1664 25.8662 3.6447Z" />
        <path d="M33 18C32.4477 18 32 17.5522 32 17C32 16.4477 32.4477 16 33 16C33.5522 16 34 16.4477 34 17C34 17.5522 33.5522 18 33 18Z" />
        <path d="M31.3556 9.86619C30.8773 10.1424 30.2658 9.97846 29.9896 9.50017C29.7135 9.02187 29.8773 8.41028 30.3556 8.13414C30.8339 7.858 31.4455 8.02187 31.7217 8.50017C31.9978 8.97846 31.8339 9.59005 31.3556 9.86619Z" />
        <path d="M30.3556 25.8662C29.8773 25.5901 29.7134 24.9785 29.9896 24.5002C30.2657 24.0219 30.8773 23.858 31.3556 24.1342C31.8339 24.4103 31.9978 25.0219 31.7216 25.5002C31.4455 25.9785 30.8339 26.1424 30.3556 25.8662Z" />
        <path d="M16 33C16 32.4477 16.4477 32 17 32C17.5523 32 18 32.4477 18 33C18 33.5523 17.5523 34 17 34C16.4477 34 16 33.5523 16 33Z" />
        <path d="M24.1341 31.3557C23.858 30.8774 24.0219 30.2658 24.5002 29.9896C24.9785 29.7135 25.5901 29.8774 25.8662 30.3557C26.1423 30.834 25.9785 31.4455 25.5002 31.7217C25.0219 31.9978 24.4103 31.834 24.1341 31.3557Z" />
        <path d="M9.8662 31.3556C9.59005 31.8339 8.97846 31.9978 8.50017 31.7216C8.02188 31.4455 7.858 30.8339 8.13415 30.3556C8.41029 29.8773 9.02188 29.7134 9.50017 29.9896C9.97846 30.2657 10.1424 30.8773 9.8662 31.3556Z" />
        <path d="M1 18C0.447715 18 -3.44684e-08 17.5523 0 17C3.44684e-08 16.4477 0.447715 16 1 16C1.55228 16 2 16.4477 2 17C2 17.5523 1.55228 18 1 18Z" />
        <path d="M3.6447 25.8662C3.1664 26.1424 2.55481 25.9785 2.27867 25.5002C2.00253 25.0219 2.1664 24.4103 2.6447 24.1342C3.12299 23.858 3.73458 24.0219 4.01072 24.5002C4.28686 24.9785 4.12299 25.5901 3.6447 25.8662Z" />
        <path d="M2.6447 9.8662C2.1664 9.59005 2.00253 8.97846 2.27867 8.50017C2.55481 8.02188 3.1664 7.858 3.6447 8.13415C4.12299 8.41029 4.28686 9.02188 4.01072 9.50017C3.73458 9.97846 3.12299 10.1424 2.6447 9.8662Z" />
        <path d="M16 1C16 0.447715 16.4477 -4.87226e-08 17 0C17.5523 4.87226e-08 18 0.447715 18 1C18 1.55228 17.5523 2 17 2C16.4477 2 16 1.55228 16 1Z" />
        <path d="M8.13415 3.6447C7.858 3.16641 8.02188 2.55482 8.50017 2.27867C8.97846 2.00253 9.59005 2.16641 9.8662 2.6447C10.1424 3.12299 9.97846 3.73458 9.50017 4.01072C9.02188 4.28687 8.41029 4.12299 8.13415 3.6447Z" />
      </motion.g>
      </motion.svg>
  )
}

export function Mark({ className }) {
  return (
    <svg viewBox="0 0 34 34" fill="none" className={className}>
      <path d="M19.598 18.5C18.7696 19.9349 16.9348 20.4265 15.4999 19.5981C14.065 18.7696 13.5734 16.9349 14.4018 15.5C15.2303 14.0651 17.065 13.5735 18.4999 14.4019C19.9348 15.2303 20.4264 17.0651 19.598 18.5Z" />
      <path d="M23.232 10.2058C22.6797 11.1623 21.4565 11.4901 20.4999 10.9378C19.5433 10.3855 19.2156 9.16235 19.7679 8.20576C20.3201 7.24918 21.5433 6.92143 22.4999 7.47371C23.4565 8.026 23.7842 9.24918 23.232 10.2058Z" />
      <path d="M19.7679 25.7944C19.2156 24.8378 19.5433 23.6146 20.4999 23.0623C21.4565 22.51 22.6797 22.8378 23.232 23.7944C23.7843 24.7509 23.4565 25.9741 22.4999 26.5264C21.5433 27.0787 20.3202 26.7509 19.7679 25.7944Z" />
      <path d="M25.9999 19.0001C24.8953 19.0001 23.9999 18.1047 23.9999 17.0001C23.9999 15.8956 24.8953 15.0001 25.9999 15.0001C27.1045 15.0001 27.9999 15.8956 27.9999 17.0001C27.9999 18.1047 27.1045 19.0001 25.9999 19.0001Z" />
      <path d="M14.232 25.7942C13.6797 26.7508 12.4565 27.0786 11.4999 26.5263C10.5433 25.974 10.2156 24.7508 10.7679 23.7942C11.3201 22.8376 12.5433 22.5099 13.4999 23.0622C14.4565 23.6145 14.7842 24.8376 14.232 25.7942Z" />
      <path d="M10.7679 10.2059C10.2157 9.24936 10.5434 8.02618 11.5 7.4739C12.4566 6.92161 13.6798 7.24936 14.232 8.20595C14.7843 9.16253 14.4566 10.3857 13.5 10.938C12.5434 11.4903 11.3202 11.1625 10.7679 10.2059Z" />
      <path d="M7.99999 19.0002C6.89542 19.0002 5.99999 18.1047 5.99999 17.0002C5.99999 15.8956 6.89542 15.0002 7.99999 15.0002C9.10456 15.0002 9.99999 15.8956 9.99999 17.0002C9.99999 18.1047 9.10456 19.0002 7.99999 19.0002Z" />
      <path d="M25.8659 3.64359C25.5898 4.12188 24.9782 4.28575 24.4999 4.00961C24.0216 3.73347 23.8577 3.12188 24.1339 2.64359C24.41 2.16529 25.0216 2.00142 25.4999 2.27756C25.9782 2.5537 26.1421 3.16529 25.8659 3.64359Z" />
      <path d="M33.0001 18.0002C32.4478 18.0002 32.0001 17.5524 32.0001 17.0002C32.0001 16.4479 32.4478 16.0002 33.0001 16.0002C33.5523 16.0002 34.0001 16.4479 34.0001 17.0002C34.0001 17.5524 33.5523 18.0002 33.0001 18.0002Z" />
      <path d="M31.3561 9.86594C30.8778 10.1421 30.2663 9.97821 29.9901 9.49992C29.714 9.02162 29.8778 8.41003 30.3561 8.13389C30.8344 7.85775 31.446 8.02162 31.7222 8.49992C31.9983 8.97821 31.8344 9.5898 31.3561 9.86594Z" />
      <path d="M30.3563 25.866C29.878 25.5899 29.7141 24.9783 29.9903 24.5C30.2664 24.0217 30.878 23.8578 31.3563 24.134C31.8346 24.4101 31.9985 25.0217 31.7223 25.5C31.4462 25.9783 30.8346 26.1422 30.3563 25.866Z" />
      <path d="M16.0001 33.0001C16.0001 32.4478 16.4478 32.0001 17.0001 32.0001C17.5524 32.0001 18.0001 32.4478 18.0001 33.0001C18.0001 33.5524 17.5524 34.0001 17.0001 34.0001C16.4478 34.0001 16.0001 33.5524 16.0001 33.0001Z" />
      <path d="M24.134 31.3566C23.8579 30.8783 24.0218 30.2667 24.5001 29.9905C24.9784 29.7144 25.59 29.8783 25.8661 30.3566C26.1422 30.8349 25.9784 31.4464 25.5001 31.7226C25.0218 31.9987 24.4102 31.8349 24.134 31.3566Z" />
      <path d="M9.86593 31.3564C9.58978 31.8347 8.97819 31.9986 8.4999 31.7224C8.02161 31.4463 7.85773 30.8347 8.13388 30.3564C8.41002 29.8781 9.02161 29.7142 9.4999 29.9904C9.97819 30.2665 10.1421 30.8781 9.86593 31.3564Z" />
      <path d="M1 18.0001C0.447715 18.0001 -3.44684e-08 17.5524 0 17.0001C3.44684e-08 16.4478 0.447715 16.0001 1 16.0001C1.55228 16.0001 2 16.4478 2 17.0001C2 17.5524 1.55228 18.0001 1 18.0001Z" />
      <path d="M3.64329 25.866C3.16499 26.1422 2.5534 25.9783 2.27726 25.5C2.00112 25.0217 2.16499 24.4101 2.64329 24.134C3.12158 23.8578 3.73317 24.0217 4.00931 24.5C4.28545 24.9783 4.12158 25.5899 3.64329 25.866Z" />
      <path d="M2.6435 9.86602C2.1652 9.58987 2.00133 8.97828 2.27747 8.49999C2.55361 8.0217 3.1652 7.85782 3.6435 8.13397C4.12179 8.41011 4.28566 9.0217 4.00952 9.49999C3.73338 9.97828 3.12179 10.1422 2.6435 9.86602Z" />
      <path d="M16.0001 1C16.0001 0.447715 16.4478 -4.87226e-08 17.0001 0C17.5524 4.87226e-08 18.0001 0.447715 18.0001 1C18.0001 1.55228 17.5524 2 17.0001 2C16.4478 2 16.0001 1.55228 16.0001 1Z" />
      <path d="M8.13398 3.64371C7.85783 3.16542 8.02171 2.55383 8.5 2.27768C8.97829 2.00154 9.58988 2.16542 9.86603 2.64371C10.1422 3.122 9.97829 3.73359 9.5 4.00973C9.02171 4.28588 8.41012 4.122 8.13398 3.64371Z" />
    </svg>
  )
}
