export function RedeemersApp(props: { active: boolean }) {
  return (
    <div className={`flex flex-col ${props.active ? 'opacity-100' : 'opacity-50'} ${props.active ? 'blur-0' : 'blur-sm'} transition-all duration-700`}>
      <div className="flex flex-row">
        <div className="h-full w-1/3">
          <img className="h-full w-full object-cover" src="/redeemers-church/app-announcements.webp" />
        </div>
        <div className="h-full w-1/3">
          <img className="h-full w-full object-cover" src="/redeemers-church/app-teaching.webp" />
        </div>
        <div className="h-full w-1/3">
          <img className="h-full w-full object-cover" src="/redeemers-church/app-prayer-requests.webp" />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="h-full w-1/3">
          <img className="h-full w-full object-cover" src="/redeemers-church/app-announcement-detail.webp" />
        </div>
        <div className="h-full w-1/3">
          <img className="h-full w-full object-cover" src="/redeemers-church/app-teaching-detail.webp" />
        </div>
        <div className="h-full w-1/3">
          <img className="h-full w-full object-cover" src="/redeemers-church/app-prayer-request-detail.webp" />
        </div>
      </div>
    </div>
  )
}
