export function BidMgmt2(props: { active: boolean }) {
  return (
    <div className={`flex flex-col ${props.active ? 'opacity-100' : 'opacity-50'} ${props.active ? 'blur-0' : 'blur-sm'} transition-all duration-700`}>
      <div className="flex flex-row">
        <div className="h-full w-1/2 p-7">
          <img className="h-full w-full object-cover" src="/bid-mgmt/before-search-for-bidders.png" />
        </div>
        <div className="h-full w-1/2 p-7">
          <img className="h-full w-full object-cover" src="/bid-mgmt/new-bid-list.png" />
        </div>

      </div>
      <div className="flex flex-row">
        <div className="h-full w-1/2 p-7">
          <img className="h-full w-full object-cover" src="/bid-mgmt/before-bid-list.png" />
        </div>
        <div className="h-full w-1/2 p-7">
          <img className="h-full w-full object-cover" src="/bid-mgmt/new-search-for-bidders.png" />
        </div>

      </div>
    </div>
  )
}
