import Head from 'next/head'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import IsContract_Contract from '../blockchain/IsContract'
import 'bulma/css/bulma.css'
import styles from '../styles/IsContract.module.css'

const IsContractApp = () => {
    const [error, setError] = useState('')
    const [error2, setError2] = useState('')
    const [error3, setError3] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [successMsg2, setSuccessMsg2] = useState('')
    const [successMsg3, setSuccessMsg3] = useState('')
    const [inventory, setInventory] = useState('')
    const [Result1, setResult1] = useState('')
    const [Result2, setResult2] = useState('')
    const [Result3, setResult3] = useState('')
    const [contractAdd, SetcontractAdd] = useState('')
    const [contractAdd2, SetcontractAdd2] = useState('')
    const [contractAdd3, SetcontractAdd3] = useState('')
    const [web3, setWeb3] = useState(null)
    const [address, setAddress] = useState(null)
    const [vmContract, setVmContract] = useState(null)

    useEffect(() => {
        if (vmContract) getAddressHandler()
    }, [vmContract, address])

    const getAddressHandler = async () => {
        const inventory = await vmContract.methods.thisAddress().call()
        setInventory(inventory)
    }

    const updateResult_method1 = async () => {
        try {
            setError('')
            setSuccessMsg('')
            const Result1 = await vmContract.methods.isContractMethod1(contractAdd).call()
            setResult1(Result1)
            setSuccessMsg(`${Result1}`)
        }
        catch (err) {
            setError(err.message)
        }
    }

    const updateResult_method2 = async () => {
        try {
            setError2('')
            setSuccessMsg2('')
            const Result2 = await vmContract.methods.isContractMethod2(contractAdd2).call()
            setResult1(Result2)
            setSuccessMsg2(`${Result2}`)
        }
        catch (err) {
            setError2(err.message)
        }
    }
    const updateResult_method3 = async () => {
        try {
            setError3('')
            setSuccessMsg3('')
            const Result3 = await vmContract.methods.isContractMethod3(contractAdd3).call()
            setResult3(Result3)
            setSuccessMsg3(`${Result3}`)
        }
        catch (err) {
            setError3(err.message)
        }
    }

    const updateQuery = event => {
        SetcontractAdd(event.target.value)
    }

    const updateQuery2 = event => {
        SetcontractAdd2(event.target.value)
    }

    const updateQuery3 = event => {
        SetcontractAdd3(event.target.value)
    }

    const connectWalletHandler = async () => {
        /* check if MetaMask is installed */
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                /* request wallet connect */
                await window.ethereum.request({ method: "eth_requestAccounts" })
                /* create web3 instance and set to state var */
                const web3 = new Web3(window.ethereum)
                /* set web3 instance */
                setWeb3(web3)
                /* get list of accounts */
                const accounts = await web3.eth.getAccounts()
                /* set Account 1 to React state var */
                setAddress(accounts[0])


                /* create local contract copy */
                const vm = IsContract_Contract(web3)
                setVmContract(vm)
            } catch (err) {
                setError(err.message)
            }
        } else {
            // meta mask is not installed
            console.log("Please install MetaMask")
        }
    }

    return (
        <div className={styles.main}>
            <Head>
                <title>VendingMachine App</title>
                <meta name="description" content="A blockchain app" />
            </Head>
            <nav className="navbar mt-4 mb-4">
                <div className="container">
                    <div className="navbar-brand">
                        <h1>Dude Is It A Contract??</h1>
                    </div>
                    <div className="navbar-end">
                        <button onClick={connectWalletHandler} className="button is-primary">Connect Wallet</button>
                    </div>
                </div>
            </nav>
            <section>
                <div className="container">
                    <h2>This contract is deployed at address: {inventory}</h2>
                </div>
            </section>

            <section className="mt-5">
                <div className="container">
                    <div className="field">
                        <label className="label">Check if an address is a contract by Method 1</label>
                        <div className="control">
                            <input onChange={updateQuery} className="input" type="type" placeholder="Enter address..." />
                        </div>
                        <button
                            onClick={updateResult_method1}
                            className="button is-primary mt-2"
                        >Check</button>
                    </div>
                </div>
            </section>
            <section>
                <div className="container has-text-success">
                    <p>{successMsg}</p>
                </div>
            </section>
            <section>
                <div className="container has-text-danger">
                    <p>{error}</p>
                </div>

            </section>
            <section className="mt-5">
                <div className="container">
                    <div className="field">
                        <label className="label">Check if an address is a contract by Method 2</label>
                        <div className="control">
                            <input onChange={updateQuery2} className="input" type="type" placeholder="Enter address..." />
                        </div>
                        <button
                            onClick={updateResult_method2}
                            className="button is-primary mt-2"
                        >Check</button>
                    </div>
                </div>
            </section>
            <section>
                <div className="container has-text-success">
                    <p>{successMsg2}</p>
                </div>
            </section>
            <section>
                <div className="container has-text-danger">
                    <p>{error2}</p>
                </div>
            </section>
            <section className="mt-5">
                <div className="container">
                    <div className="field">
                        <label className="label">Check if an address is a contract by Method 3</label>
                        <div className="control">
                            <input onChange={updateQuery3} className="input" type="type" placeholder="Enter address..." />
                        </div>
                        <button
                            onClick={updateResult_method3}
                            className="button is-primary mt-2"
                        >Check</button>
                    </div>
                </div>
            </section>
            <section>
                <div className="container has-text-success">
                    <p>{successMsg3}</p>
                </div>
            </section>
            <section>
                <div className="container has-text-danger">
                    <p>{error3}</p>
                </div>
            </section>
        </div>
    )
}

export default IsContractApp