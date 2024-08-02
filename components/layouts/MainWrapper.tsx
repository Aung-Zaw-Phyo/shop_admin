import React, {ReactNode} from 'react'
import Drawer from './Drawer'
import PageList from './PageList';
import DropdownUser from './DropdownUser';

const MainWrapper = ({children,}: Readonly<{children: React.ReactNode;}>) => {

  return (
        <div className="flex h-[100vh] overflow-hidden "> 
            <div className="bg-[#233044] text-white hidden md:block overflow-y-scroll overflow-x-hidden no-scrollbar">
                <PageList/>
            </div>
            <div className="w-full overflow-y-scroll no-scrollbar">
                <div className="flex justify-between items-center py-3 px-6 sticky top-0 z-50 bg-white shadow-sm">
                    <div>
                        <Drawer/>
                    </div>
                    <DropdownUser/>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
  )
}

export default MainWrapper