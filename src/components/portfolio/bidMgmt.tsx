export function BidMgmt(props: { active: boolean }) {
  return (
    <div className={`flex flex-col ${props.active ? 'opacity-100' : 'opacity-50'} ${props.active ? 'blur-0' : 'blur-sm'} transition-all duration-700`}>
      <div className="flex flex-row">
        <div className="h-full w-1/2 p-7">
          <img className="h-full w-full object-cover" src="/bid-mgmt/before-new-bid-package.png" />
        </div>

        <div className="h-full w-1/2 p-7">
          <img className="h-full w-full object-cover" src="/bid-mgmt/new-create-bid-package.png" />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="h-full w-1/2 p-7">
          <img className="h-full w-full object-cover" src="/bid-mgmt/before-bid-package.png" />
        </div>
        <div className="h-full w-1/2 p-7">
          <img className="h-full w-full object-cover" src="/bid-mgmt/new-bid-package.jpeg" />
        </div>
      </div>
    </div>
  )
}
