import React, {ReactNode} from 'react'
import Drawer from './Drawer'
import PageList from './PageList';

const MainWrapper = ({children,}: Readonly<{children: React.ReactNode;}>) => {
  return (
        <div className="flex h-[100vh] overflow-hidden "> 
            <div className="bg-[#233044] text-white hidden md:block overflow-y-scroll overflow-x-hidden no-scrollbar">
                <PageList/>
            </div>
            <div className="w-full overflow-y-scroll no-scrollbar">
                <div className="flex justify-between items-center py-3 px-6 sticky top-0 bg-white shadow-sm">
                    <div>
                        <Drawer/>
                    </div>
                    <div className="flex justify-center items-center gap-3">
                        <div className="text-end">
                            <div className="">Aung Zaw Phyo</div>
                            <div className="text-sm text-gray-500">Admin</div>
                        </div>
                        <img className="rounded-full" width={50} height={50} src="https://react-demo.tailadmin.com/assets/user-01-b007ff3f.png" alt="" />
                    </div>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
  )
}

export default MainWrapper