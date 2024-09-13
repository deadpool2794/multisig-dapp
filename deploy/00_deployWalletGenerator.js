async function deployWalletGenerator(hre) {
    const { deployer } = await hre.getNamedAccounts();
    console.log("deployer", deployer);
    const { deploy } = hre.deployments;
    await deploy("WalletGenerator", {
        from: deployer,
        args: [],
        log: true,
        autoMine: true,
    });

    const walletGenerator = await hre.ethers.getContract("WalletGenerator");

    console.log("Done");
}

module.exports.default = deployWalletGenerator;
