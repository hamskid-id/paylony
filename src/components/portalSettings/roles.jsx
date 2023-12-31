import { DashBoardLayout } from "../global/dashboardLayout";
import { PortalLayout } from "./portalLayout";
import { useEffect, useState } from "react";
import Spinner from "../global/spinner";
import { TableLayout } from "../agents/tableLayout";
import { TableDropDown } from "../global/dropdown";
import { useDeleteRolesMutation, useGetAllRolesQuery } from "../../store/apiSlice";
import { toast } from "react-toastify";

export const AllRoles =()=>{
    const{
        data:rolesData,
        isLoading:rolesIsLoading,
        isError,
        error
    }= useGetAllRolesQuery();

    const [deleteRoles, {isLoading :deleteIsLoading}] = useDeleteRolesMutation();

    const deleteAction =(id)=>{
        deleteRoles(id).unwrap().then((payload)=>{
            toast(payload?.message)
        }).catch((error)=>{
            const{
                status,
                data
            }=error
            if(data?.error){
                toast.error(data?.error)
            }else{
             toast.error(data?.message)
            }
            console.log(error)
        })
    }

    const[
        actionData,
        setActionData
    ]= useState([]);

    useEffect(()=>{
        if(rolesData){
            setActionData(rolesData?.data)
        }
    },[rolesData])

    const bodyStyle ="whitespace-nowrap  px-6 py-4 font-light"
    const handleInputChange =(e)=>{
        const filtereddata = rolesData?.data?.filter((data)=>data.name?.toLowerCase().includes(e.target.value))
        setActionData(filtereddata)
    }

    const SortDataAction=(action)=>{
        let filteredData=terminalData?.data?.sort((a, b)=> (a.name < b.name ) ? -1 : (a.name > b.name) ? 1 : 0);
        setActionData( filteredData)
    }

    if(isError){
        const{
            status,
            data
        }=error
        if(data?.error){
            toast.error(data?.error)
        }else{
         toast.error(data?.message)
        }
        console.log(error)
    }

    return(
        <DashBoardLayout>
        <PortalLayout  title="Roles">
        {
            rolesIsLoading ? (
                <Spinner/>
                ):(
                <TableLayout
                    createBtnAction={()=>window.location.replace("/add_roles")}
                    createBtnText="Add Roles"
                    headerData={[
                        "S/n","Name","Guard name","Action"
                    ]}
                    handleInputChange={(e)=>handleInputChange(e)}
                    sortButton={[
                        {
                            title:"Name",
                            action:"name"
                        }
                    ]}
                    SortDataAction={SortDataAction}
                    data={ actionData}
                >
                {
                    actionData?.map((info,index)=>{
                        const{
                            id,
                            name,
                            guard_name
                        }=info
                        return(
                            <tr 
                                className="border-b dark:border-neutral-500"
                                key={index}
                            >
                                <td className={bodyStyle}>{index+1}</td>
                                {
                                    [
                                        name,
                                        guard_name
                                    ].map((body,index)=>{
                                        return  (
                                            <td className={bodyStyle} key={index}>{body}</td>
                                            )
                                    })
                                }
                                <td>
                                    <TableDropDown
                                        list={[
                                            {
                                                dropTitle:deleteIsLoading?"please wait...":"delete",
                                                action:()=>deleteAction(id)
                                            },{
                                                dropTitle:"update",
                                                action:()=>window.location.replace(`/portal/update_roles/${id}`)
                                            },{
                                                dropTitle:"assign",
                                                action:()=>{
                                                    let action = "assign"
                                                    window.location.replace(`/portal/${action}/${id}`)
                                                }
                                            },{
                                                dropTitle:"revoke",
                                                action:()=>{
                                                    let action = "revoke"
                                                    window.location.replace(`/portal/${action}/${id}`)
                                                }
                                            }
                                        ]}
                                    />
                                </td>
                            </tr>
                        )
                    }
                )
            }
            </TableLayout>
            )
        }
        </PortalLayout>
        </DashBoardLayout>
    )
}