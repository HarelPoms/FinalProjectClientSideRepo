const CheckIfNumberStartsWithPrefix = ( medicineNum,  filter) =>
{

    // Convert numbers into Strings
        
    let s1 = medicineNum.toString();
    let s2 = filter.toString();

    // Find the lengths of Strings
    // s1 and s2
        
    let n1 = s1.length;
    let n2 = s2.length;

    // Base Case
    if (n1 < n2)
    {
        return false;
    }

    // Traverse the Strings s1 & s2
    for(var i = 0; i < n2; i++)
    {

        // If at any index characters
        // are unequals then return false
        if (s1[i] != s2[i])
        {
            return false;
        }
    }

    // Return true
    return true;
}

export default CheckIfNumberStartsWithPrefix;