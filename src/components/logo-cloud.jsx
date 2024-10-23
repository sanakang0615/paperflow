import { clsx } from 'clsx'

export function LogoCloud({ className }) {
  return (
    <div
      className={clsx(
        className,
        'flex justify-between max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-4',
      )}
    >
      {/* Kaist */}
      <div className="h-9 max-sm:mx-auto sm:h-8 lg:h-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="100%" 
          width="100%" 
          viewBox="-41.174445 -19.581325 356.84519 117.48795"
        >
          <defs>
            <linearGradient
              id="a"
              spreadMethod="pad"
              gradientTransform="translate(366.206 433.5308) scale(129.9883)"
              gradientUnits="userSpaceOnUse"
              y2="0" x2="1" y1="0" x1="0"
            >
              <stop offset="0" stopColor="#69c5f0" />
              <stop offset=".05" stopColor="#69c5f0" />
              <stop offset=".3816" stopColor="#3f88d0" />
              <stop offset=".5" stopColor="#3f88d0" />
              <stop offset=".7316" stopColor="#2c61b5" />
              <stop offset=".95" stopColor="#2c61b5" />
              <stop offset="1" stopColor="#2c61b5" />
            </linearGradient>
          </defs>
          <path 
            d="M130.8265 48.3517h12.8518V.0021h-12.8518zM199.5061 0v10.075h16.1672v38.2767h12.8476V10.075h16.1651V0zm-17.8999 19.1394h-10.7401c-2.855 0-5.1631-1.1804-5.1631-4.5317 0-3.3618 2.308-4.5338 5.1631-4.5338h23.0936V.001h-24.6161c-9.188 0-16.6424 5.3046-16.6424 14.6066 0 9.3 7.4543 14.6046 16.6424 14.6046h11.0505c2.8487 0 5.1631 1.1783 5.1631 4.5401 0 3.3534-2.3144 4.5275-5.163 4.5275h-25.9107v10.0729h27.1227c9.1944 0 16.6382-5.2962 16.6382-14.6004 0-9.2915-7.4438-14.613-16.6382-14.613M91.706 0L73.5307 43.5075 56.2041 24.179 77.8681 0H63.1938l-20.532 22.9542V0h-12.854v48.3517h12.854V25.3996l20.532 22.9521h21.3726L99.283 11.889l10.6894 26.8039H92.9816l4.0375 9.659h30.0412L106.8597 0z"
            fill="#1f4899"
          />
          <path 
            d="M366.177 433.572c21.232-3.019 42.932-4.58 64.996-4.58 22.063 0 43.762 1.561 64.992 4.58-21.23 3.015-42.929 4.577-64.992 4.577-22.064 0-43.764-1.562-64.996-4.577"
            fill="url(#a)" 
            transform="matrix(2.1117 0 0 -2.1117 -773.2578 984.2299)"
          />
        </svg>
      </div>
      <img
        alt="Laravel"
        src="/logo-cloud/laravel.svg"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      <img
        alt="Tuple"
        src="/logo-cloud/tuple.svg"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      <img
        alt="Transistor"
        src="/logo-cloud/transistor.svg"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      <img
        alt="Statamic"
        src="/logo-cloud/statamic.svg"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
    </div>
  )
}
