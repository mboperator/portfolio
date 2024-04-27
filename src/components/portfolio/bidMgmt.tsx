export function BidMgmt(props: { active: boolean }) {
  return (
    <div className={`flex flex-col ${props.active ? 'opacity-100' : 'opacity-50'} ${props.active ? 'blur-0' : 'blur-sm'} transition-all duration-700`}>
      <div className="flex flex-col 2xl:flex-row">
        <div className="h-72 md:h-full 2xl:h-full w-full 2xl:w-1/2 p-3 2xl:p-7">
          <p className="text-white pt-3">Before | New Bid Package View</p>
          <img className="h-56 md:h-full w-full object-left-top 2xl:object-center object-cover rounded-3xl" src="/bid-mgmt/before-new-bid-package.webp" />
        </div>

        <div className="h-72 md:h-full 2xl:h-full w-full 2xl:w-1/2 p-3 2xl:p-7">
          <p className="text-white pt-3">After | New Bid Package View</p>
          <img className="h-56 md:h-full w-full object-left-top 2xl:object-center object-cover rounded-3xl" src="/bid-mgmt/new-create-bid-package.webp" />
        </div>
      </div>
      <div className="flex flex-col mt-12 2xl:mt-0 2xl:flex-row">
        <div className="h-72 md:h-full 2xl:h-full w-full 2xl:w-1/2 p-3 2xl:p-7">
          <p className="text-white pt-3">Before | Bid Package View</p>
          <img className="h-56 md:h-full w-full object-left-top 2xl:object-center object-cover rounded-3xl" src="/bid-mgmt/before-bid-package.webp" />
        </div>
        <div className="h-72 md:h-full 2xl:h-full w-full 2xl:w-1/2 p-3 2xl:p-7">
          <p className="text-white pt-3">After | Bid Package View</p>
          <img className="h-56 md:h-full w-full object-left-top 2xl:object-center object-cover rounded-3xl" src="/bid-mgmt/new-bid-package.webp" />
        </div>
      </div>
    </div>
  )
}
