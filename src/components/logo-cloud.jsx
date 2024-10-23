import { clsx } from 'clsx'

export function LogoCloud({ className }) {
  return (
    <div
      className={clsx(
        className,
        'flex justify-between max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-4',
      )}
    >
      {/* Kaist Logo */}
      <img
        alt="KAIST Logo"
        src="/asset/kaist-logo.png"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
        style={{
          width: '160px',
          height: 'auto',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />

      {/* OpenAI Logo */}
      <img
        alt="OpenAI Logo"
        src="/asset/open-ai.png"
        className="h-8 max-sm:mx-auto sm:h-8 lg:h-10 mt-8"
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />

      {/* Tuple Logo */}
      <img
        alt="Clova Logo"
        src="/asset/clova-logo.png"
        className="h-8 max-sm:mx-auto sm:h-8 lg:h-12"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          marginTop: '25px'
        }}
      />

      {/* Transistor Logo */}
      <img
        alt="Transistor Logo"
        src="/logo-cloud/transistor.png"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />

      {/* Statamic Logo */}
      <img
        alt="Statamic Logo"
        src="/logo-cloud/statamic.png"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
    </div>
  )
}
