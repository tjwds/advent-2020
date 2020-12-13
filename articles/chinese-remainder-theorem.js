/**
 * solveRemainderTheorem - Solves Chinese Remainder Theorem.
 *
 * This is the first year that I've actually found myself succeeding with Advent
 * of Code.  Maybe I've just gotten to the point in my professional career where
 * I've made up for my background, which has very little math education in it.
 * But shame on you, Wikipedia editors, for letting Wikipedia articles about
 * math get into the state that they are now.
 *
 * Below is some commented code that I wrote while following along with this
 * video from Center of Math: (https://www.youtube.com/watch?v=0dbXaSkZ-vc
 *
 * I don't even know the name of this algorithm!  But it worked, and thus I'll
 * share it with you.
 *
 * @param {number[]} remainders
 * @param {number[]} modulos
 * @return {BigInt[]} - the answer, which can be expressed as the first entry
 *                      in the array mod the second.  (see below)
 *
 * @example to solve:
 * x = 2 mod 3
 * x = 3 mod 5
 * x = 2 mod 7
 *
 * solveRemainderTheorem([2, 3, 2], [3, 5, 7]);
 * returns [23n, 105n]: 23 mod 105
 */
const solveRemainderTheorem = (remainders, moduluses) => {
    // first, let's calculate the multiplicand of all of our moduluses
    const bigM = moduluses.reduce((a, b) => a * b);
    // and a series of numbers that are the M with the factor removed; that is,
    // bigMs[x] is equal to all other numbers in moduluses multiplied together.
    const bigMs = moduluses.map(bus => bigM / bus);
    // next, each of these bigMs has a number, Y, which can be multiplied by the
    // bigM to produce a number which will leave a remainder of 1, modulus that
    // bigM's corresponding modulus.  If we use the example above, we have:
    // bigMs = [ 35, 21, 15 ].  21 % 5 and 15 % 7 both equal 1, but we need to
    // multiply 35 * 2 to get 70 % 3 = 1.  Thus Ys = [2, 1, 1].
    const Ys = bigMs.map((M, index) => {
        let Y = 1;
        while (true) {
            if ((M * Y) % moduluses[index] === 1) return Y;
            Y++;
        }
    });
    // To solve, we simply multiply each corresponding remainder, bigM entry,
    // and Y together and add them up; then we end up with a number we can
    // reduce with the modulo we already calculated (bigM).
    let X = BigInt(0);
    for (let n = 0; n < moduluses.length; n++) {
        X += BigInt(remainders[n]) * BigInt(bigMs[n]) * BigInt(Ys[n]);
    }

    // reduce X and return the two values:
    const bigIntBigM = BigInt(bigM);
    return [X % bigIntBigM, bigIntBigM];
};

module.exports = { solveRemainderTheorem };
