import { AgentLayout } from "./agentLayout"
import { TableLayout } from "./tableLayout";
import { DashBoardLayout } from "../global/dashboardLayout";
import {useGetAllAgentsQuery} from "../../store/apiSlice"
import { toast } from "react-toastify";
import Spinner from "../global/spinner";
import { useEffect, useState } from "react";

export const ViewAgent =()=>{
    const{
        data:agentData,
        isLoading,
        isError,
        error
    }= useGetAllAgentsQuery();

    const[
        actionData,
        setActionData
    ]= useState([]);

    useEffect(()=>{
        if(agentData){
            setActionData(agentData?.data)
        }
    },[agentData])

    const bodyStyle ="whitespace-nowrap  px-6 py-4 font-light"
    const handleInputChange =(e)=>{
        const filtereddata = agentData?.data?.filter((data)=>data.first_name?.toLowerCase().includes(e.target.value))
        setActionData(filtereddata)
    }

    const SortDataAction=(action)=>{
        let filteredData;
        switch(action){
            case 'name':(
                filteredData = agentData?.data?.sort((a, b)=> (a.first_name < b.first_name ) ? -1 : (a.first_name > b.first_name) ? 1 : 0)
            )
            break;
            case 'email':(
                filteredData = agentData?.data?.sort((a, b)=> (a.email < b.email) ? -1 : (a.email > b.email) ? 1 : 0)
            )
            break;
            case 'agent_type':(
                filteredData = agentData?.data?.sort((a, b)=> (a.agent_type < b.agent_type ) ? -1 : (a.agent_type > b.agent_type) ? 1 : 0)
            )
            break;
            case 'date':(
                filteredData = agentData?.data?.sort((a, b)=> (a.created_at < b.created_at ) ? -1 : (a.created_at > b.created_at) ? 1 : 0)
            )
            break;
            default:(
                filteredData = agentData?.data?.sort((a, b)=> (a.first_name < b.first_name ) ? -1 : (a.first_name > b.first_name) ? 1 : 0)
            )
            break;
        }
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
        <AgentLayout title="View Agents">
            {
                isLoading ? (
                    <Spinner/>
                    ):(
                        <TableLayout
                            createBtnAction={()=>window.location.replace("/personalInfo")}
                            createBtnText="Create Agent"
                            handleInputChange={(e)=>handleInputChange(e)}
                            sortButton={[
                                {
                                    title:"Name",
                                    action:"name"
                                },{
                                    title:"Email",
                                    action:"email"
                                },{
                                    title:"Agent type",
                                    action:"agent_type"
                                },{
                                    title:"Date",
                                    action:"date"
                                },
                            ]}
                            SortDataAction={SortDataAction}
                            headerData={[
                                "s/n","first_name","last_name","email","Date of birth","gender","Residential Address","State","Agent Type","User Type",
                                "Account Status","Created At","Updated At"
                            ]}
                            data={actionData}
                        >
                        {
                            actionData?.map((info,index)=>{
                                const{
                                    id,
                                    first_name,
                                    last_name,
                                    email,
                                    dob,
                                    gender,
                                    residential_address,
                                    state,
                                    agent_type,
                                    user_type,
                                    business,
                                    created_at,
                                    updated_at,
                                    account_status
                                }=info
                                return(
                                    <tr 
                                        className="border-b dark:border-neutral-500"
                                        key={index}
                                    >
                                        <td className={bodyStyle}>{index+1}</td>
                                        {
                                            [
                                            //    id,
                                                first_name,
                                                last_name,
                                                email,
                                                dob,
                                                gender,
                                                residential_address,
                                                state,
                                                agent_type,
                                                user_type,
                                                account_status
                                            ].map((body,index)=>{
                                                return  (
                                                    <td className={bodyStyle} key={index}>{body}</td>
                                                    )
                                            })
                                        }
                                        <td className={bodyStyle}>{
                                                new Date(created_at)
                                                .toLocaleString()
                                            }
                                        </td>
                                        <td className={bodyStyle}>{
                                                new Date(updated_at)
                                                .toLocaleString()
                                            }
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                    </TableLayout>
                )
            }
        </AgentLayout>
        </DashBoardLayout>
    )
}