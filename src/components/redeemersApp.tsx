export function RedeemersApp(props: { active: boolean }) {
  return (
    <div className={`flex flex-col ${props.active ? 'opacity-100' : 'opacity-50'} ${props.active ? 'blur-0' : 'blur-sm'} transition-all duration-700`}>
      <div className="flex flex-row">
        <div className="h-full w-1/3">
          <img className="h-full w-full object-cover" src="/redeemers-church/app-announcements.png" />
        </div>
        <div className="h-full w-1/3">
          <img className="h-full w-full object-cover" src="/redeemers-church/app-teaching.png" />
        </div>
        <div className="h-full w-1/3">
          <img className="h-full w-full object-cover" src="/redeemers-church/app-prayer-requests.png" />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="h-full w-1/3">
          <img className="h-full w-full object-cover" src="/redeemers-church/app-announcement-detail.png" />
        </div>
        <div className="h-full w-1/3">
          <img className="h-full w-full object-cover" src="/redeemers-church/app-teaching-detail.png" />
        </div>
        <div className="h-full w-1/3">
          <img className="h-full w-full object-cover" src="/redeemers-church/app-prayer-request-detail.png" />
        </div>
      </div>
    </div>
  )
}
