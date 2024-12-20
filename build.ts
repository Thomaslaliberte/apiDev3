/**
 * Remove old files, copy front-end ones.
 */

import logger from 'jet-logger';
import childProcess from 'child_process';


/**
 * Start
 */
(async () => {
  try {

    // Copy back-end files
    await exec('tsc --build tsconfig.prod.json', './');
  } catch (err) {
    logger.err(err);
    process.exit(1);
  }
})();



/**
 * Do command line command.
 */
function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return childProcess.exec(cmd, {cwd: loc}, (err, stdout, stderr) => {
      if (!!stdout) {
        logger.info(stdout);
      }
      if (!!stderr) {
        logger.warn(stderr);
      }
      return (!!err ? rej(err) : res());
    });
  });
}
